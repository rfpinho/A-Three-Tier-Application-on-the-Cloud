class ComponentePlaylists1 extends React.Component {
    constructor() {
        super();
        this.editarPerfil = this.editarPerfil.bind(this);
        this.excluirConta = this.excluirConta.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "utilizador",
            dataType: 'json',
            type: "GET",
            success: function(data) {
                if (data["autenticado"] == true) {
                    $("#nomeUtilizador").text(data["nome"]);
                } else {
                    window.location.replace("login.html");
                }
            }
        });
    }

    editarPerfil() {
        $.ajax({
            url: "utilizador",
            dataType: 'json',
            type: "GET",
            success: function(data) {
                bootbox.dialog({
                    title: "Editar perfil",
                    message:
                        '<table style="width:100%">' +
                            '<tr>' +
                                '<td>Nome</td>' +
                                '<td><input type="text" id="nome" value="' + data["nome"] + '" placeholder="Nome" class="form-control input-md"></td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>Email</td>' +
                                '<td><input type="text" id="email" value="' + data["email"] + '" placeholder="Email" class="form-control input-md"></td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>Password</td>' +
                                '<td><input type="password" id="password" value="" placeholder="Password" class="form-control input-md"></td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>Telefone</td>' +
                                '<td><input type="number" id="telefone" value="' + data["telefone"] + '" placeholder="Telefone" class="form-control input-md"></td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td></td>' +
                                '<td><button class="btn btn-lg btn-success btn-block" type="submit" id="submit" onClick="btnEditarPerfil()">Editar perfil</button></td>' +
                            '</tr>' +
                        '</table>' +
                        '<script>' +
                            'function btnEditarPerfil() {' +
                                '$.ajax({' +
                                     'url: "utilizador",' +
                                     'dataType: "json",' +
                                     'type: "PUT",' +
                                     'data: {' +
                                        'nome : $("#nome").val(),' +
                                        'email : $("#email").val(),' +
                                        'password : $("#password").val(),' +
                                        'telefone : $("#telefone").val(),' +
                                     '},' +
                                     'success: function(data) {' +
                                        'if (data["autenticado"] == true) {' +
                                            'if (data["sucesso"] == true) {' +
                                                '$("#nomeUtilizador").text(data["nome"]);' +
                                                'bootbox.hideAll();' +
                                                'bootbox.alert(data["mensagem"]);' +
                                            '} else {' +
                                                'bootbox.hideAll();' +
                                                'bootbox.alert(data["mensagem"]);' +
                                            '}' +
                                        '} else {' +
                                            'bootbox.hideAll();' +
                                            'window.location.replace("login.html");' +
                                        '}' +
                                     '}' +
                                '});' +
                            '}' +
                        '</script>',
                    buttons: {
                    }
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }

    excluirConta() {
        bootbox.dialog({
            title: "Têm a certeza que pretende excluir a sua conta?",
            message:
                '<table style="width:100%">' +
                    '<tr>' +
                        '<td><button class="btn btn-md btn-success btn-block" type="submit" onClick="btnExcluirConta()">Sim</button></td>' +
                        '<td><button class="btn btn-md btn-danger btn-block" type="submit" onClick="btnNaoExcluirConta()">Não</button></td>' +
                    '</tr>' +
                '</table>' +
                '<script>' +
                    'function btnExcluirConta() {' +
                        '$.ajax({' +
                            'url: "utilizador",' +
                            'dataType: "json",' +
                            'type: "DELETE",' +
                            'data: {' +
                            '},' +
                            'success: function(data) {' +
                                'if (data["autenticado"] == true) {' +
                                    'if (data["sucesso"] == true) {' +
                                        'bootbox.hideAll();' +
                                        'window.location.replace("login.html");' +
                                    '} else {' +
                                        'bootbox.hideAll();' +
                                        'bootbox.alert(data["mensagem"]);' +
                                    '}' +
                                '} else {' +
                                    'bootbox.hideAll();' +
                                    'window.location.replace("login.html");' +
                                '}' +
                            '}' +
                        '});' +
                    '}' +
                    'function btnNaoExcluirConta() {' +
                        'bootbox.hideAll();' +
                    '}' +
                '</script>',
            buttons: {
            }
        });
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span> <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Projeto ES</a>
                    </div>
                    <div className="collapse navbar-collapse"bid="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown"><a href="#" id="nomeUtilizador" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a onClick={this.editarPerfil}>Editar perfil</a></li>
                                    <li><a onClick={this.excluirConta}>Excluir conta</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="logout">Sair</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

class ComponentePlaylists2 extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="col-md-2">
                <div className="panel panel-primary" style={{textAlign:"center"}}>
                    <div className="panel-heading">
                        <h3 className="panel-title">Menu</h3>
                    </div>
                    <div className="panel-body" align="center">
                        <ul className="nav nav-pills nav-stacked" role="tablist">
                            <li role="presentation"><a href="musicas.html">M&uacute;sicas<span className="badge"></span></a></li>
                            <li role="presentation" className="active"><a href="#">Playlists<span className="badge"></span></a></li>
                            <li role="presentation"><a href="pesquisar.html">Pesquisar<span className="badge"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

class ComponentePlaylists3 extends React.Component {
    constructor() {
        super();
        this.state = {ordem: 1, opcao: "nome", idPlaylist: 0, listaPlaylits : [], listaMusicas : []};
        this.atualizarTabela = this.atualizarTabela.bind(this);
        this.ordenamentoNome = this.ordenamentoNome.bind(this);
        this.ordenamentoData = this.ordenamentoData.bind(this);
        this.ordenamentoTamanho = this.ordenamentoTamanho.bind(this);
        this.removerPlaylist = this.removerPlaylist.bind(this);
        this.listarMusicasPlaylist = this.listarMusicasPlaylist.bind(this);
        this.removerMusica = this.removerMusica.bind(this);
    }

    componentDidMount() {
        this.atualizarTabela();
        this.timer = setInterval(this.atualizarTabela, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    atualizarTabela() {
        $.ajax({
            url: "playlist/" + this.state.opcao,
            dataType: 'json',
            type: "GET",
            success: function(data) {
                if (data["autenticado"] == true) {
                    this.setState({listaPlaylits: data["lista"]});
                } else {
                    window.location.replace("login.html");
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }

    ordenamentoNome() {
        if (this.state.opcao == "nome"){
            var v = this.state.ordem * (-1);
            this.setState({ordem: v});
        }
        else{
            this.setState({ordem: 1});
            this.setState({opcao: "nome"});
            this.atualizarTabela();
        }
    }

    ordenamentoData() {
        if (this.state.opcao == "dataCriacao"){
            var v = this.state.ordem * (-1);
            this.setState({ordem: v});
        }
        else{
            this.setState({ordem: 1});
            this.setState({opcao: "dataCriacao"});
            this.atualizarTabela();
        }
    }

    ordenamentoTamanho() {
        if (this.state.opcao == "tamanho"){
            var v = this.state.ordem * (-1);
            this.setState({ordem: v});
        }
        else{
            this.setState({ordem: 1});
            this.setState({opcao: "tamanho"});
            this.atualizarTabela();
        }
    }

    inserirPlaylist() {
        bootbox.dialog({
            title: "Inserir playlist",
			message:
                '<table style="width:100%">' +
                    '<tr>' +
                        '<td>Nome</td>' +
                        '<td><input type="text" id="nome" placeholder="Nome" class="form-control input-md"></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td></td>' +
                        '<td><button class="btn btn-lg btn-success btn-block" type="submit" id="submit" onClick="btnInserirPlaylist()">Inserir playlist</button></td>' +
                    '</tr>' +
                '</table>' +
                '<script>' +
                    'function btnInserirPlaylist() {' +
                        '$.ajax({' +
                            'url: "playlist",' +
                            'dataType: "json",' +
                            'type: "POST",' +
                             'data: {' +
                                'nome : $("#nome").val(),' +
                             '},' +
                             'success: function(data) {' +
                                'if (data["autenticado"] == true) {' +
                                    'if (data["sucesso"] == true) {' +
                                        'bootbox.hideAll();' +
                                        'bootbox.alert(data["mensagem"]);' +
                                    '} else {' +
                                        'bootbox.hideAll();' +
                                        'bootbox.alert(data["mensagem"]);' +
                                     '}' +
                                '} else {' +
                                    'bootbox.hideAll();' +
                                    'window.location.replace("login.html");' +
                                '}' +
                             '}' +
                        '});' +
                    '}' +
                '</script>',
            buttons: {
            }
        });
    }

    editarPlaylist(linha) {
        bootbox.dialog({
            title: "Editar nome playlist",
			message:
                '<table style="width:100%">' +
                    '<tr>' +
                        '<td>Nome</td>' +
                        '<td><input type="text" id="nome" value="' + linha.Nome + '" placeholder="Nome" class="form-control input-md"></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td></td>' +
                        '<td><button class="btn btn-lg btn-success btn-block" type="submit" id="submit" onClick="btnEditarPlaylist(' + linha.Id + ')">Editar nome</button></td>' +
                    '</tr>' +
                '</table>' +
                '<script>' +
                    'function btnEditarPlaylist(id) {' +
                        '$.ajax({' +
                            'url: "playlist/" + id,' +
                            'dataType: "json",' +
                            'type: "PUT",' +
                             'data: {' +
                                'nome : $("#nome").val(),' +
                             '},' +
                             'success: function(data) {' +
                                'if (data["autenticado"] == true) {' +
                                    'if (data["sucesso"] == true) {' +
                                        'bootbox.hideAll();' +
                                        'bootbox.alert(data["mensagem"]);' +
                                    '} else {' +
                                        'bootbox.hideAll();' +
                                        'bootbox.alert(data["mensagem"]);' +
                                     '}' +
                                '} else {' +
                                    'bootbox.hideAll();' +
                                    'window.location.replace("login.html");' +
                                '}' +
                             '}' +
                        '});' +
                    '}' +
                '</script>',
            buttons : {
            }
        });
    }

    removerPlaylist(linha) {
        var that = this;
         bootbox.confirm("Têm a certeza que pretende eliminar esta playlist?", function(result) {
		    if (result == true) {
				$.ajax({
					url: "playlist/" + linha.Id,
					dataType: "json",
					type: "DELETE",
					success: function(data) {
					    if (data["autenticado"] == true) {
                            if (data["sucesso"] == true) {
                                that.setState({listaMusicas: []});
                                bootbox.alert(data["mensagem"]);
                            } else {
                                bootbox.alert(data["mensagem"]);
                            }
                        } else {
							window.location.replace("login.html");
						}
					}
				});
			}
        });
    }

    listarMusicasPlaylist(linha) {
        this.setState({idPlaylist: linha.Id});
        $.ajax({
            url: "listaMusicasPlaylists/" + linha.Id,
            dataType: "json",
            type: "GET",
            success: function(data) {
                if (data["autenticado"] == true) {
                    this.setState({listaMusicas: data["lista"]});
                } else {
                    window.location.replace("login.html");
                }
            }.bind(this)
        });
    }

    removerMusica(linha) {
        var that = this;
        var idPlaylist = this.state.idPlaylist;
         bootbox.confirm("Têm a certeza que pretende eliminar esta música da playlist selecionada?", function(result) {
		    if (result == true) {
				$.ajax({
					url: "removeMusicaPlaylist/" + idPlaylist,
					dataType: "json",
					type: "DELETE",
					data: {
						'idMusica' : linha.Id
					},
					success: function(data) {
						if (data["sucesso"] == true) {
							bootbox.alert(data["mensagem"]);
							$.ajax({
                                url: "listaMusicasPlaylists/" + idPlaylist,
                                dataType: "json",
                                type: "GET",
                                success: function(data) {
                                    if (data["autenticado"] == true) {
                                        that.setState({listaMusicas: data["lista"]});
                                    } else {
                                        window.location.replace("login.html");
                                    }
                                }.bind(this)
                            });
						} else {
							bootbox.alert(data["mensagem"]);
						}
					}
				});
			}
        });
    }

    render() {
        if (this.state.ordem > 0){
            var htmlListaPlaylists = [];
              for (var i = 0; i < this.state.listaPlaylits.length; i = i + 1) {
                var linha = this.state.listaPlaylits[i];
                htmlListaPlaylists.push(<LinhaTabela key={linha.Id} linha={linha} onEditarPlaylist={this.editarPlaylist} onListarMusicasPlaylist={this.listarMusicasPlaylist} onRemoverPlaylist={this.removerPlaylist} /> );
              }
        }
        else{
            var htmlListaPlaylists = [];
              for (var i = this.state.listaPlaylits.length - 1; i >= 0; i = i - 1) {
                var linha = this.state.listaPlaylits[i];
                htmlListaPlaylists.push(<LinhaTabela key={linha.Id} linha={linha} onEditarPlaylist={this.editarPlaylist} onListarMusicasPlaylist={this.listarMusicasPlaylist} onRemoverPlaylist={this.removerPlaylist} /> );
              }
        }
        var htmlListaMusicas = [];
        var that = this;
        this.state.listaMusicas.map(function(linha) {
            htmlListaMusicas.push(<LinhaTabela2 key={linha.Id} linha={linha} onRemoverMusica={that.removerMusica} /> );
        });

        return (
            <div className="col-md-9">
                <div className="container">
                    <br/><br/>
                    <div className="col-md-12"></div>
                    <div className="col-md-2"><button className="btn btn-default btn-block" type="submit" onClick={this.ordenamentoNome}><span className="glyphicon glyphicon-sort" aria-hidden="true"></span> Ordenar por nome</button></div>
                    <div className="col-md-2"><button className="btn btn-default btn-block" type="submit" onClick={this.ordenamentoData}><span className="glyphicon glyphicon-sort" aria-hidden="true"></span> Ordenar por data</button></div>
                    <div className="col-md-2"><button className="btn btn-default btn-block" type="submit" onClick={this.ordenamentoTamanho}><span className="glyphicon glyphicon-sort" aria-hidden="true"></span> Ordenar tamanho</button></div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3" aligh="right">
                        <button className="btn btn-default btn-success btn-block" type="submit" onClick={this.inserirPlaylist}><span className="glyphicon glyphicon-music" aria-hidden="true"></span> Inserir playlist</button>
                    </div>
                    <div className="col-md-12">
                        <p></p>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nome playlist</th>
                                <th>Data criação</th>
                                <th>Tamanho</th>
                            </tr>
                        </thead>
                        <tbody>
                            {htmlListaPlaylists}
                        </tbody>
                    </table>
                    <div className="col-md-12">
                        <br></br>
                        <br></br>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Artista</th>
                                <th>Álbum</th>
                                <th>Ano lançamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {htmlListaMusicas}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class LinhaTabela extends React.Component {
    constructor() {
        super();
        this.editarPlaylist = this.editarPlaylist.bind(this);
        this.removerPlaylist = this.removerPlaylist.bind(this);
        this.listarMusicasPlaylist = this.listarMusicasPlaylist.bind(this);
    }

    editarPlaylist() {
        this.props.onEditarPlaylist(this.props.linha);
    }

    removerPlaylist() {
        this.props.onRemoverPlaylist(this.props.linha);
    }

    listarMusicasPlaylist() {
        this.props.onListarMusicasPlaylist(this.props.linha);
    }

    render() {
        return (
            <tr>
                <td>{this.props.linha.Nome}</td>
                <td>{this.props.linha.Data}</td>
                <td>{this.props.linha.Tamanho}</td>
                <td>
                    <button type="button" className="btn btn-default btn-sm" onClick={this.editarPlaylist}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</button>
                    <button type="button" className="btn btn-default btn-sm" onClick={this.removerPlaylist}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Remover</button>
                    <button type="button" className="btn btn-default btn-sm" onClick={this.listarMusicasPlaylist}><span className="glyphicon glyphicon-list" aria-hidden="true"></span> Listar/remover músicas</button>
                </td>
            </tr>
        );
    }
}

class LinhaTabela2 extends React.Component {
    constructor() {
        super();
        this.removerMusica = this.removerMusica.bind(this);
    }

    removerMusica() {
          this.props.onRemoverMusica(this.props.linha);
     }

    render() {
        return (
            <tr>
                <td>{this.props.linha.Titulo}</td>
                <td>{this.props.linha.Artista}</td>
                <td>{this.props.linha.Album}</td>
                <td>{this.props.linha.AnoLancamento}</td>
                <td>
                    <button type="button" className="btn btn-default btn-sm" onClick={this.removerMusica}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Remover música</button>
                 </td>
            </tr>
        );
    }
}


ReactDOM.render(<ComponentePlaylists1/>, div1); // Barra superior
ReactDOM.render(<ComponentePlaylists2/>, div2); // Menu do lado esquerdo
ReactDOM.render(<ComponentePlaylists3/>, div3); // Tabela das playlists