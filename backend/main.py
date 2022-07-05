from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import worker
from datetime import datetime, timedelta, timezone
import json
import os
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, JWTManager
import stripe

app = Flask(__name__)
CORS(app)

jwt = JWTManager(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route('/token', methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = worker.lookupuser(username, password)
    if not (user):
        return {"msg": "Wrong username or password"}, 401
    else:
        access_token = create_access_token(identity=username)
        response = {"access_token":access_token}
        return response

@app.route('/create', methods=["POST"])
def usertable():
    username = request.json.get("username", None)
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    user = worker.lookupuser(username, password)
    if not (user):
        create = worker.create(username, name, password)
        access_token = create_access_token(identity=username)
        response = {"access_token":access_token}
        return response
    elif user:
        access_token = create_access_token(identity=username)
        response = {"access_token":access_token}
        return response, {"msg": "Account already exists"}

@app.route('/search', methods=["GET", "POST"])
def search():
    activity = request.json.get("activity", None)
    date = request.json.get("date", None)
    guests = request.json.get("guests", None)
    budget = request.json.get("budget", None)
    findings = worker.search(activity, date, guests, budget)
    worker.validation(activity, date, budget, guests)
    return findings

@app.route('/times', methods=["GET", "POST"])
def time():
    id = request.json.get("id", None)
    date = request.json.get("date", None)
    print(date)
    #print(datetime.strptime(date, "DD.MM.YYYY").strftime("YYYY-MM-DD"))
    available_spots = worker.gettimes(id, date)
    print(available_spots)
    return available_spots

@app.route('/table')
def table():
    worker.places()
    return render_template("success.html")

@app.route('/validation')
def validation():
    worker.records()
    return render_template("success.html")

#api live key 
stripe.api_key = os.environ.get("stk")

def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 50


def charge_customer(customer_id):
    payment_methods = stripe.PaymentMethod.list(
        customer=customer_id,
        type='card'
    )
    # Charge the customer and payment method immediately
    try:
        stripe.PaymentIntent.create(
            amount=50,
            currency='eur',
            customer=customer_id,
            payment_method=payment_methods.data[0].id,
            off_session=True,
            confirm=True
        )
    except stripe.error.CardError as e:
        err = e.error
        # Error code will be authentication_required if authentication is needed
        print('Code is: %s' % err.code)
        payment_intent_id = err.payment_intent['id']
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)


@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    # Alternatively, set up a webhook to listen for the payment_intent.succeeded event
    # and attach the PaymentMethod to a new Customer
    customer = stripe.Customer.create()

    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            customer=customer['id'],
            setup_future_usage='off_session',
            amount=calculate_order_amount(data['items']),
            currency='eur',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)