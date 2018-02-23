from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import or_
import hashlib
import time
from entidades import *
from classesDTO import *

databaseurl = 'mysql+pymysql://root:1994@localhost:3306/es'
#databaseurl = 'mysql+pymysql://-.rds.amazonaws.com:3306/es'

engine = create_engine(databaseurl)
session_factory = sessionmaker(bind = engine)
session = scoped_session(session_factory)

def hashMD5(password):
    hash = hashlib.md5(('ES' + password).encode('utf-8')).hexdigest()
    return hash

def registarConta(nome, email, password, telefone):
    utilizador = session.query(Utilizador).filter_by(email = email).first()
    if utilizador is None:
        utilizador = Utilizador(nome = nome, email = email, password = hashMD5(password), telefone = telefone)
        session.add(utilizador)
        session.commit()
        idUtilizador = utilizador.id
        session.remove()
        print('[CRUD] Conta registada com sucesso')
        return idUtilizador
    else:
        session.remove()
        print('[CRUD] Erro ao registar conta! O utilizador já existe')
        return -1

def editarConta(idUtilizador, nome, email, password, telefone):
    utilizador = session.query(Utilizador).get(idUtilizador)
    if utilizador is not None:
        if utilizador.email != email:
            utilizador2 = session.query(Utilizador).filter_by(email=email).first()
            if utilizador2 is None:
                utilizador.email = email
            else:
                session.remove()
                print('[CRUD] Erro ao editar conta! O email já existe')
                return False
        utilizador.nome = nome
        if password != '':
            utilizador.password = hashMD5(password)
        utilizador.telefone = telefone
        session.commit()
        session.remove()
        print('[CRUD] Conta editada com sucesso')
        return True
    else:
        session.remove()
        print('[CRUD] Erro ao editar conta! Conta não encontrada')
        return False

def removerConta(idUtilizador):
    utilizador = session.query(Utilizador).get(idUtilizador)
    administrador = session.query(Utilizador).filter_by(email = 'admin@gmail.com').first()
    if utilizador is not None and administrador is not None:
        musicas = utilizador.musicas
        for musica in musicas:
            musica.idUtilizador = administrador.id
            session.commit()
        playlists = utilizador.playlists
        for playlist in playlists:
            session.delete(playlist)
        session.delete(utilizador)
        session.commit()
        session.remove()
        print('[CRUD] Utilizador removido do sistema com sucesso')
        return True
    else:
        session.remove()
        print('[CRUD] Erro ao remover conta! Utilizador não encontrado')
        return False

def login(email, password):
    utilizador = session.query(Utilizador).filter_by(email = email).filter_by(password = hashMD5(password)).first()
    if utilizador is not None:
        idUtilizador = utilizador.id
        session.remove()
        print('[CRUD] Login válido')
        return idUtilizador
    else:
        session.remove()
        print('[CRUD] Erro no login! Email não existe na base de dados')
        return -1

def obterInfoUtilizador(idUtilizador):
    utilizador = session.query(Utilizador).get(idUtilizador)
    if utilizador is not None:
        utilizadorDTO = converterUtilizadorDTO(utilizador)
        session.remove()
        print('[CRUD] Info do utilizador obtida com sucesso')
        return utilizadorDTO
    else:
        session.remove()
        print('[CRUD] Erro ao obter info do utilizador! Utilizador não encontrado')
        return None

def criarPlaylist(idUtilizador, nome):
    playlist = Playlist(nome = nome, idUtilizador = idUtilizador)
    session.add(playlist)
    session.commit()
    session.remove()
    print('[CRUD] Playlist registada com sucesso')
    return True

def editarPlaylist(idPlaylist, nome):
    playlist = session.query(Playlist).get(idPlaylist)
    if playlist is not None:
        playlist.nome = nome
        session.commit()
        session.remove()
        print('[CRUD] Playlist editada com sucesso')
        return True
    else:
        session.remove()
        print('[CRUD] Erro ao editar playlist! Playlist não encontrada')
        return False

def removerPlaylist(idUtilizador, idPlaylist):
    utilizador = session.query(Utilizador).get(idUtilizador)
    if utilizador is not None:
        playlist = session.query(Playlist).get(idPlaylist)
        if playlist is not None and playlist in utilizador.playlists:
            session.delete(playlist)
            session.commit()
            session.remove()
            print('[CRUD] Playlist removida do utilizador com sucesso')
            return True
        else:
            session.remove()
            print('[CRUD] Erro ao remover playlist! Playlist não encontrada')
            return False
    else:
        session.remove()
        print('[CRUD] Erro ao remover playlist! Utilizador não encontrado')
        return False

def adicionarMusicaPlaylist(idPlaylist, idMusica):
    playlist = session.query(Playlist).get(idPlaylist)
    if playlist is not None:
        musica = session.query(Musica).get(idMusica)
        if musica is not None:
            playlist.musicas.append(musica)
            session.commit()
            session.remove()
            print('[CRUD] Música adicionada à playlist com sucesso')
            return True
        else:
            session.remove()
            print('[CRUD] Erro ao adicionar música à playlist! Música não encontrada')
            return False
    else:
        session.remove()
        print('[CRUD] Erro ao adicionar música à playlist! Playlist não encontrada')
        return False

def removerMusicaPlaylist(idPlaylist, idMusica):
    playlist = session.query(Playlist).get(idPlaylist)
    if playlist is not None:
        musica = session.query(Musica).get(idMusica)
        if musica is not None and musica in playlist.musicas:
            playlist.musicas.remove(musica)
            session.commit()
            session.remove()
            print('[CRUD] Música removida da playlist com sucesso')
            return True
        else:
            session.remove()
            print('[CRUD] Erro ao remover música da playlist! Música não encontrada')
            return False
    else:
        session.remove()
        print('[CRUD] Erro ao remover música da playlist! Playlist não encontrada')
        return False

def listarPlaylists(idUtilizador, tipo):
    if tipo == 'nome':
        playlists = session.query(Playlist).filter_by(idUtilizador = idUtilizador).order_by(Playlist.nome.asc()).all()
        playlistsDTO = [converterPlaylistDTO(playlist) for playlist in playlists]
        session.remove()
        return playlistsDTO
    elif tipo == 'dataCriacao':
        playlists = session.query(Playlist).filter_by(idUtilizador = idUtilizador).order_by(Playlist.dataCriacao.desc()).all()
        playlistsDTO = [converterPlaylistDTO(playlist) for playlist in playlists]
        session.remove()
        return playlistsDTO
    elif tipo == 'tamanho':
        playlists = session.query(Playlist).filter_by(idUtilizador = idUtilizador).all()
        playlists.sort(key = f, reverse = True)
        playlistsDTO = [converterPlaylistDTO(playlist) for playlist in playlists]
        session.remove()
        return playlistsDTO

def f(playlist):
    return len(playlist.musicas)

def listarMusicasPlaylist(idPlaylist):
    playlist = session.query(Playlist).get(idPlaylist)
    if playlist is not None:
        musicasDTO = [converterMusicaDTO(musica) for musica in playlist.musicas]
        session.remove()
        print('[CRUD] Músicas da playlist obtidas obtidas com sucesso')
        return musicasDTO
    else:
        session.remove()
        print('[CRUD] Erro ao listar músicas da playlist! Playlist não encontrada')
        return None

def inserirMusica(titulo, artista, album, anoLancamento, pathFicheiro, idUtilizador):
    musica = Musica(titulo = titulo, artista = artista, album = album, anoLancamento = anoLancamento, pathFicheiro = pathFicheiro, idUtilizador = idUtilizador)
    session.add(musica)
    session.commit()
    session.remove()
    print('[CRUD] Música inserida com sucesso')
    return True

def editarMusica(idMusica, titulo, artista, album, anoLancamento):
    musica = session.query(Musica).get(idMusica)
    if musica is not None:
        musica.titulo = titulo
        musica.artista = artista
        musica.album = album
        musica.anoLancamento = anoLancamento
        session.commit()
        session.remove()
        print('[CRUD] Música editada com sucesso')
        return True
    else:
        session.remove()
        print('[CRUD] Erro ao editar música! Música não encontrada')
        return False

def removerMusica(idMusica):
    musica = session.query(Musica).get(idMusica)
    if musica is not None:
        administrador = session.query(Utilizador).filter_by(email = 'admin@gmail.com').first()
        if administrador is not None:
            musica.idUtilizador = administrador.id
            session.commit()
            session.remove()
            print('[CRUD] Música removida com sucesso')
            return True
        else:
            session.remove()
            print('[CRUD] Erro ao remover conta! Utilizador admin não encontrado')
            return False
    else:
        session.remove()
        print('[CRUD] Erro ao remover conta! Música não encontrada')
        return False

def listarMusicas(idUtilizador):
    utilizador = session.query(Utilizador).get(idUtilizador)
    if utilizador is not None:
        musicasDTO = [converterMusicaDTO(musica) for musica in utilizador.musicas]
        session.remove()
        print('[CRUD] Músicas do utilizador devolvidas com sucesso')
        return musicasDTO
    else:
        session.remove()
        print('[CRUD] Erro! Utilizador não encontrado')
        return None

def listarMusicasSistema():
    musicas = session.query(Musica).order_by(Musica.id).all()
    if musicas is not None:
        musicasDTO = [converterMusicaDTO(musica) for musica in musicas]
        session.remove()
        print('[CRUD] Músicas do sistema devolvidas com sucesso')
        return musicasDTO
    else:
        session.remove()
        print('[CRUD] Não foi encontrada nenhuma música no sistema')
        return None

def pesquisarMusicaSistema(titulo, artista):
    if titulo != '' and artista != '':
        musicas = session.query(Musica).filter(Musica.titulo == titulo).filter(Musica.artista == artista).all()
        musicasDTO = [converterMusicaDTO(musica) for musica in musicas]
        session.remove()
        print('[CRUD] Músicas do sistema devolvidas com sucesso')
        return musicasDTO
    elif titulo != '' or artista != '':
        musicas = session.query(Musica).filter(or_(Musica.titulo == titulo, Musica.artista == artista)).all()
        musicasDTO = [converterMusicaDTO(musica) for musica in musicas]
        session.remove()
        print('[CRUD] Músicas do sistema devolvidas com sucesso')
        return musicasDTO
    return None

def converterUtilizadorDTO(utilizador):
    utilizadorDTO = UtilizadorDTO(id = utilizador.id, nome = utilizador.nome, email = utilizador.email, password = utilizador.password, telefone = utilizador.telefone)
    return utilizadorDTO

def converterMusicaDTO(musica):
    musicaDTO = MusicaDTO(id = musica.id, titulo = musica.titulo, artista = musica.artista, album = musica.album, anoLancamento = musica.anoLancamento, pathFicheiro = musica.pathFicheiro)
    return musicaDTO

def converterPlaylistDTO(playlist):
    playlistDTO = PlaylistDTO(id = playlist.id, nome = playlist.nome, dataCriacao = playlist.dataCriacao, tamanhoPlaylist = len(playlist.musicas))
    return playlistDTO


if __name__ == '__main__':
    registarConta('Admin', 'admin@gmail.com', 'admin', '963647196')
    registarConta('Utilizador', 'utilizador@gmail.com', 'utilizador', '963647196')
    registarConta('Utilizador 2', 'utilizador2@gmail.com', 'utilizador2', '963647196')
    inserirMusica('Titulo 1', 'Artista 1', 'Album 1', '2010', 'esprojeto2/Música 1.wav', 2)
    inserirMusica('Titulo 2', 'Artista 2', 'Album 2', '2012', 'esprojeto2/Música 2.wav', 2)
    inserirMusica('Titulo 3', 'Artista 3', 'Album 3', '2015', 'esprojeto2/Música 3.wav', 3)
    criarPlaylist(2, 'Playlist 1')
    time.sleep(1)
    criarPlaylist(2, 'Playlist 2')
    time.sleep(1)
    criarPlaylist(3, 'Playlist 1')
    adicionarMusicaPlaylist(1, 1)
    adicionarMusicaPlaylist(1, 2)
    adicionarMusicaPlaylist(2, 1)
    adicionarMusicaPlaylist(3, 3)