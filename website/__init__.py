from flask import Flask, render_template

def create_app():
	app = Flask(__name__)

	@app.route("/")
	def inicio():
		return render_template("/inicio.html")
#_____________Inicio bitcoin_______________________
	@app.route("/btc")
	def btc():
		return render_template("/pages/btc.html")

	return app