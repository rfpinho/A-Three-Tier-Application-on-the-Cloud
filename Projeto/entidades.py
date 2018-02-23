from sqlalchemy import Table, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import DateTime
from sqlalchemy.sql import func
from sqlalchemy import create_engine

databaseurl = 'mysql+pymysql://root:1994@localhost:3306/es'
#databaseurl = 'mysql+pymysql://-.amazonaws.com:3306/es'
Base = declarative_base()

association_table = Table('associacao_playlist_musica', Base.metadata,
    Column('playlist_id', Integer, ForeignKey('playlist.id')),
    Column('musica_id', Integer, ForeignKey('musica.id'))
)

class Utilizador(Base):
    __tablename__ = 'utilizador'

    id = Column(Integer, Sequence('utilizador_id_seq'), primary_key = True)
    nome = Column(String(100), nullable = False)
    email = Column(String(100), nullable = False)
    password = Column(String(100), nullable = False)
    telefone = Column(String(100), nullable = False)
    musicas = relationship('Musica', back_populates = 'utilizador')
    playlists = relationship('Playlist', back_populates = 'utilizador')

    def __init__(self, nome, email, password, telefone):
        self.nome = nome
        self.email = email
        self.password = password
        self.telefone = telefone

    def __repr__(self):
        return 'Utilizador(id = ' + str(self.id) + ', nome = ' + self.nome + ', email = ' + self.email + ', password = ' + self.password + ', telefone = ' + self.telefone + ')'


class Musica(Base):
    __tablename__ = 'musica'

    id = Column(Integer, Sequence('musica_id_seq'), primary_key = True)
    titulo = Column(String(100), nullable = False)
    artista = Column(String(100), nullable = False)
    album = Column(String(100), nullable = False)
    anoLancamento = Column(String(100), nullable = False)
    pathFicheiro = Column(String(100), nullable = False)
    idUtilizador = Column(Integer, ForeignKey('utilizador.id'))
    utilizador = relationship('Utilizador', back_populates = 'musicas')
    playlists = relationship('Playlist', secondary = association_table, back_populates = 'musicas')

    def __init__(self, titulo, artista, album, anoLancamento, pathFicheiro, idUtilizador):
        self.titulo = titulo
        self.artista = artista
        self.album = album
        self.anoLancamento = anoLancamento
        self.pathFicheiro = pathFicheiro
        self.idUtilizador = idUtilizador

    def __repr__(self):
        return 'Musica(id = ' + str(self.id) + ', título = ' + self.titulo + ', artista = ' + self.artista + ', álbum = ' + self.album + ', ano lançamento = ' + self.anoLancamento + ', path ficheiro = ' + self.pathFicheiro + ')'


class Playlist(Base):
    __tablename__ = 'playlist'

    id = Column(Integer, Sequence('playlist_id_seq'), primary_key = True)
    nome = Column(String(100), nullable = False)
    dataCriacao = Column(DateTime(timezone = True), nullable = False, server_default = func.now())
    idUtilizador = Column(Integer, ForeignKey('utilizador.id'))
    utilizador = relationship('Utilizador', back_populates = 'playlists')
    musicas = relationship('Musica', secondary = association_table, back_populates = 'playlists')

    def __init__(self, nome, idUtilizador):
        self.nome = nome
        self.idUtilizador = idUtilizador

    def __repr__(self):
        return 'Playlist(id = ' + str(self.id) + ', nome = ' + self.nome + ', data criação = ' + self.dataCriacao.strftime("%d/%m/%y %H:%M:%S") + ')'


if __name__ == '__main__':
    engine = create_engine(databaseurl)
    Base.metadata.create_all(engine)