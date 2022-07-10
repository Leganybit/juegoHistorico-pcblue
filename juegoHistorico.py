#Esta es mi propia web, creada con mi propio css, donde hablaré de los temas que a mí me gustan. 

from website import create_app

app=create_app()

if __name__ == "__main__":
	app.run(debug=True, host="127.0.0.1", port=5007)