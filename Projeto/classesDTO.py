class UtilizadorDTO:
    def __init__(self, id, nome, email, password, telefone):
        self.id = id
        self.nome = nome
        self.email = email
        self.password = password
        self.telefone = telefone

    def __repr__(self):
        return 'UtilizadorDTO(id = ' + str(self.id) + ', nome = ' + self.nome + ', email = ' + self.email + ', password = ' + self.password + ', telefone = ' + self.telefone + ')'


class MusicaDTO:
    def __init__(self, id, titulo, artista, album, anoLancamento, pathFicheiro):
        self.id = id
        self.titulo = titulo
        self.artista = artista
        self.album = album
        self.anoLancamento = anoLancamento
        self.pathFicheiro = pathFicheiro

    def __repr__(self):
        return 'MusicaDTO(id = ' + str(self.id) + ', título = ' + self.titulo + ', artista = ' + self.artista + ', álbum = ' + self.album + ', ano lançamento = ' + self.anoLancamento + ', path ficheiro = ' + self.pathFicheiro + ')'


class PlaylistDTO:
    def __init__(self, id, nome, dataCriacao, tamanhoPlaylist):
        self.id = id
        self.nome = nome
        self.dataCriacao = dataCriacao
        self.tamanhoPlaylist = tamanhoPlaylist

    def __repr__(self):
        return 'PlaylistDTO(id = ' + str(self.id) + ', nome = ' + self.nome + ', data criação = ' + self.dataCriacao.strftime("%d/%m/%y %H:%M:%S") + ', tamanho playlist = ' + str(self.tamanhoPlaylist) + ')'