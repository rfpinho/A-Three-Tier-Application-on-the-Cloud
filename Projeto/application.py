from flask import request, Response, redirect
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
import connexion
import json
import boto3
from datetime import timedelta
import servidorCRUD as crud

def index():
    return redirect('login.html')

# ------------------------------------------------ Métodos login.html e registar.html ------------------------------------------------
def login():
    email = request.form['email']
    password = request.form['password']
    idUtilizador = crud.login(email, password)
    if idUtilizador != -1:
        user = User(idUtilizador)
        login_user(user)
        return redirect('musicas.html')
    else:
        return redirect('login.html')

def logout():
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        logout_user()
    return redirect('login.html')

def registarConta():
    nome = request.form['nome']
    email = request.form['email']
    password = request.form['password']
    telefone = request.form['telefone']
    idUtilizador = crud.registarConta(nome, email, password, telefone)
    if idUtilizador != -1:
        user = User(idUtilizador)
        login_user(user)
        return redirect('musicas.html')
    else:
        return redirect('registar.html')

# ------------------------------------------------ Métodos nav superior ------------------------------------------------
def obterInfoUtilizador():
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        utilizador = crud.obterInfoUtilizador(idUtilizador)
        dicionario['autenticado'] = True
        dicionario['nome'] = utilizador.nome
        dicionario['email'] = utilizador.email
        dicionario['telefone'] = int(utilizador.telefone)
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def editarConta():
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        nome = request.form['nome']
        email = request.form['email']
        password = request.form['password']
        telefone = request.form['telefone']
        if nome != '' and email != '' and telefone != '':
            resultado = crud.editarConta(idUtilizador, nome, email, password, telefone)
            if resultado == True:
                dicionario['sucesso'] = True
                dicionario['mensagem'] = 'Perfil editado com sucesso'
                utilizador = crud.obterInfoUtilizador(idUtilizador)
                dicionario['nome'] = utilizador.nome
            else:
                dicionario['sucesso'] = False
                dicionario['mensagem'] = 'Erro! Não foi possível editar o perfil'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Certifique que preencheu todos os campos (alterar a password é opcional)'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def removerConta():
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        resultado = crud.removerConta(idUtilizador)
        if resultado == True:
            logout_user()
            dicionario['sucesso'] = True
            dicionario['mensagem'] = 'Conta removida com sucesso'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Não foi possível remover a conta'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

# ---------------------------------------------- Métodos musicas.html ----------------------------------------------
def inserirMusica():
    extensoes = ['mp3', 'wav', 'flac', 'txt']
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        titulo = request.form['titulo']
        artista = request.form['artista']
        album = request.form['album']
        anoLancamento = request.form['anoLancamento']
        ficheiro = request.files['ficheiro']
        array = ficheiro.filename.split('.')
        if array[1] not in extensoes:
            return redirect('musicas.html')
        resultado = crud.inserirMusica(titulo, artista, album, anoLancamento, 'esprojeto2/' + ficheiro.filename, idUtilizador)
        if resultado == True:
            ficheiro.save('ficheiros/' + ficheiro.filename)
            #s3 = boto3.resource('s3')
            #s3.Bucket('esprojeto2').put_object(Key = ficheiro.filename, Body = ficheiro)
        return redirect('musicas.html')
    else:
        return redirect('login.html')

def editarMusica(idMusica):
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        titulo = request.form['titulo']
        artista = request.form['artista']
        album = request.form['album']
        anoLancamento = request.form['anoLancamento']
        if titulo != '' and artista != '' and album != '' and anoLancamento != '':
            resultado = crud.editarMusica(idMusica, titulo, artista, album, anoLancamento)
            if resultado == True:
                dicionario['sucesso'] = True
                dicionario['mensagem'] = 'Música editada com sucesso'
            else:
                dicionario['sucesso'] = False
                dicionario['mensagem'] = 'Erro! Não foi possível editar a música'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Certifique que preencheu todos os campos'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def removerMusica(idMusica):
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        resultado = crud.removerMusica(idMusica)
        if resultado == True:
            dicionario['sucesso'] = True
            dicionario['mensagem'] = 'Música removida com sucesso'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Não foi possível remover a música'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def listarMusicas():
    dicionario = {}
    lista = []
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        musicas = crud.listarMusicas(idUtilizador)
        for musica in musicas:
            lista.append({'Id': str(musica.id), 'Titulo': musica.titulo, 'Artista': musica.artista, 'Album': musica.album, 'AnoLancamento': musica.anoLancamento})
        dicionario['lista'] = lista
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def adicionarMusicaPlaylist():
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        idPlaylist = int(request.form['idPlaylist'])
        idMusica = int(request.form['idMusica'])
        resultado = crud.adicionarMusicaPlaylist(idPlaylist, idMusica)
        if resultado == True:
            dicionario['sucesso'] = True
            dicionario['mensagem'] = 'Música adiciona à playlist com sucesso'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Não foi possível adicionar a música à playlist'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

# ---------------------------------------------- Métodos playlists.html ----------------------------------------------
def criarPlaylist():
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        nome = request.form['nome']
        if nome != '':
            resultado = crud.criarPlaylist(idUtilizador, nome)
            if resultado == True:
                dicionario['sucesso'] = True
                dicionario['mensagem'] = 'Playlist criada com sucesso'
            else:
                dicionario['sucesso'] = False
                dicionario['mensagem'] = 'Erro! Não foi possível criar a playlist'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Certifique que preencheu todos os campos'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def editarPlaylist(idPlaylist):
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        nome = request.form['nome']
        if nome != '':
            resultado = crud.editarPlaylist(idPlaylist, nome)
            if resultado == True:
                dicionario['sucesso'] = True
                dicionario['mensagem'] = 'Playlist editada com sucesso'
            else:
                dicionario['sucesso'] = False
                dicionario['mensagem'] = 'Erro! Não foi possível editar a playlist'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Certifique que preencheu todos os campos'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def removerPlaylist(idPlaylist):
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        resultado = crud.removerPlaylist(idUtilizador, idPlaylist)
        if resultado == True:
            dicionario['sucesso'] = True
            dicionario['mensagem'] = 'Playlist removida com sucesso'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Não foi possível remover a playlist'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def listarPlaylists(tipo):
    dicionario = {}
    lista = []
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        playlists = crud.listarPlaylists(idUtilizador, tipo)
        for playlist in playlists:
            dataCriacao = str(playlist.dataCriacao.strftime("%d/%m/%y %H:%M:%S"))
            lista.append({'Id': str(playlist.id), 'Nome': playlist.nome, 'Data': dataCriacao, 'Tamanho': str(playlist.tamanhoPlaylist)})
        dicionario['lista'] = lista
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def listarMusicasPlaylists(idPlaylist):
    dicionario = {}
    lista = []
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        musicas = crud.listarMusicasPlaylist(idPlaylist)
        for musica in musicas:
            lista.append({'Id': str(musica.id), 'Titulo': musica.titulo, 'Artista': musica.artista, 'Album': musica.album, 'AnoLancamento': musica.anoLancamento})
        dicionario['lista'] = lista
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def removerMusicaPlaylist(idPlaylist):
    dicionario = {}
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        idMusica = int(request.form['idMusica'])
        resultado = crud.removerMusicaPlaylist(idPlaylist, idMusica)
        if resultado == True:
            dicionario['sucesso'] = True
            dicionario['mensagem'] = 'Música removida da playlist com sucesso'
        else:
            dicionario['sucesso'] = False
            dicionario['mensagem'] = 'Erro! Não foi possível remover a música da playlist'
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

# ---------------------------------------------- Métodos pesquisar.html ----------------------------------------------
def listarMusicasSistema():
    dicionario = {}
    lista = []
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        musicas = crud.listarMusicasSistema()
        for musica in musicas:
            lista.append({'Id': musica.id, 'Titulo': musica.titulo, 'Artista': musica.artista, 'Album': musica.album, 'AnoLancamento': musica.anoLancamento})
        dicionario['lista'] = lista
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

def pesquisarMusicaSistema(titulo, artista):
    titulo = titulo.replace('vazio', '')
    artista = artista.replace('vazio', '')
    dicionario = {}
    lista = []
    idUtilizador = sessaoIdUtilizador()
    if idUtilizador != -1:
        dicionario['autenticado'] = True
        musicas = crud.pesquisarMusicaSistema(titulo, artista)
        if musicas is not None:
            for musica in musicas:
                lista.append({'Id': musica.id, 'Titulo': musica.titulo, 'Artista': musica.artista, 'Album': musica.album, 'AnoLancamento': musica.anoLancamento})
        dicionario['lista'] = lista
    else:
        dicionario['autenticado'] = False
    return Response(response = json.dumps(dicionario), status = 200, mimetype = "application/json")

# ---------------------------------------------- Outros ----------------------------------------------
def send_html(html_page_name):
    idUtilizador = sessaoIdUtilizador()
    if html_page_name == 'musicas.html' or html_page_name == 'playlists.html' or html_page_name == 'pesquisar.html':
        if idUtilizador == -1:
            html_page_name = 'login.html'
    f = open('static/' + html_page_name, encoding = 'utf-8', mode = 'r')
    pagina = f.read()
    f.close()
    return Response(pagina, mimetype = "text/html")

def send_javascript(js_page_name):
    f = open('static/js/' + js_page_name, encoding = 'utf-8', mode = 'r')
    pagina = f.read()
    f.close()
    return Response(pagina, mimetype = "text/babel")

def httpFibonacci(): # http://127.0.0.1:5000/computefibonacci?n=10
    try:
        n = int(request.args['n'])
    except:
        return 'Wrong arugments', 404
    return 'Fibonacci(' + str(n) + ') = ' + str(fibonacci(n))

def fibonacci(n):
    if n <= 2:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

# ---------------------------------------------- Sessão flask-login ----------------------------------------------
class User(UserMixin):
    def __init__(self, id):
        self.id = id

    def __repr__(self):
        return 'User(id = ' + str(self.id) + ')'


app = connexion.App(__name__)
app.add_api('swagger.yaml')
app.permanent_session_lifetime = timedelta(seconds = 900)
application = app.app
application.config.update(DEBUG = True, SECRET_KEY = 'ES')

login_manager = LoginManager()
login_manager.init_app(application)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(userid):
    return User(userid)

def sessaoIdUtilizador():
    try:
        utilizador = current_user
        return utilizador.id
    except AttributeError:
        return -1

application.add_url_rule('/login', view_func = login)


if __name__ == '__main__':
    app.run()