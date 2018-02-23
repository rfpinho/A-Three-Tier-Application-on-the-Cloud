class ComponentePesquisar1 extends React.Component {
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

class ComponentePesquisar2 extends React.Component {
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
                            <li role="presentation"><a href="playlists.html">Playlists<span className="badge"></span></a></li>
                            <li role="presentation" className="active"><a href="#">Pesquisar<span className="badge"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

class ComponentePesquisar3 extends React.Component {
    constructor() {
        super();
        this.pesquisarMusicas = this.pesquisarMusicas.bind(this);
        this.listarMusicasSistema = this.listarMusicasSistema.bind(this);
        this.state = {listaMusicas : []};
    }

    componentDidMount() {
        this.listarMusicasSistema();
    }

    listarMusicasSistema() {
        $.ajax({
            url: "musicasSistema",
            dataType: 'json',
            type: "GET",
            cache: false,
            success: function(data) {
                if (data["autenticado"] == true) {
                    this.setState({listaMusicas: data["lista"]});
                } else {
                    window.location.replace("login.html");
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }

    pesquisarMusicas() {
        var titulo = $("#titulo").val();
        var artista = $("#artista").val();
        if (titulo.length == 0) titulo = "vazio";
        if (artista.length == 0) artista = "vazio";
        $.ajax({
            url: "musicasSistema/" + titulo + "/" + artista,
            dataType: 'json',
            type: "GET",
            cache: false,
            success: function(data) {
                if (data["autenticado"] == true) {
                    this.setState({listaMusicas: data["lista"]});
                } else {
                    window.location.replace("login.html");
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }

    adicionarPlaylist(linha) {
        bootbox.dialog({
            title: "Selecionar playlist",
            message:
                '<table style="width:100%">' +
                    '<tr>' +
                        '<td>Playlist</td>' +
                        '<td><select class="form-control" id="selectPlaylists"></select></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td></td>' +
                        '<td><button class="btn btn-default btn-success btn-block" data-dismiss="modal" type="submit" onclick="btnAdicionarPlaylist('+ linha.Id +')">Adicionar</button></td>'+
                    '</tr>' +
                '</table>' +
                '<script>' +
                    'preencherSelect();' +
                    'function preencherSelect() {' +
                        '$.ajax({' +
                            'url: "playlist/nome",' +
                            'dataType: "json",' +
                            'type: "GET",' +
                            'success: function(data) {' +
                                'if (data["autenticado"] == true) {' +
                                    'data = data["lista"];' +
                                    'if (data.length > 0) {' +
                                        'for (var i = 0; i < data.length; i = i + 1) {' +
                                            '$("#selectPlaylists").append("<option value=" + data[i]["Id"] + ">" + data[i]["Nome"] + "</option>")' +
                                        '}' +
                                    '}' +
                                '} else {' +
                                    'window.location.replace("login.html");' +
                                '}' +
                            '}' +
                        '});' +
                    '};' +
                    'function btnAdicionarPlaylist(id) {' +
                        'var idPlaylist = document.getElementById("selectPlaylists").options[document.getElementById("selectPlaylists").selectedIndex].value;' +
                        '$.ajax({' +
                            'url: "adicionaMusicaPlaylist",' +
                            'dataType: "json",' +
                            'type: "POST",' +
                            'data: {' +
                                'idMusica : id,' +
                                'idPlaylist : idPlaylist,' +
                            '},' +
                            'success: function(data) {' +
                                'if (data["autenticado"] == true) {' +
                                    'if (data["sucesso"] == true) {' +
                                        'bootbox.alert(data["mensagem"]);' +
                                    '} else {' +
                                        'bootbox.alert(data["mensagem"]);' +
                                    '}' +
                                '} else {' +
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

    render() {
        var htmlListaMusicas = [];
        var that = this;
        this.state.listaMusicas.map(function(linha) {
            htmlListaMusicas.push(<LinhaTabela key={linha.Id} linha={linha} onAdicionarPlaylist={that.adicionarPlaylist} />);
        });

        return (
            <div className="col-md-9">
                <div className="container">
                    <br/><br/>
                    <div className="col-md-12"></div>
                    <div className="col-md-2">
                        <input type="text" name="titulo" id="titulo" className="form-control" placeholder="Título" />
                    </div>
                    <div className="col-md-2">
                        <input type="text" name="artista" id="artista" className="form-control" placeholder="Artista" />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-default btn-success btn-block" type="submit" onClick={this.pesquisarMusicas}><span className="glyphicon glyphicon-search"></span> Pesquisar</button>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-2" aligh="right">
                        <button className="btn btn-default btn-success btn-block" type="submit" onClick={this.listarMusicasSistema}><span className="glyphicon glyphicon-list" aria-hidden="true"></span> Listar músicas</button>
                    </div>
                    <div className="col-md-12">
                        <p></p>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Artista</th>
                                <th>Álbum</th>
                                <th>Ano lançamento</th>
                                <th></th>
                                <th></th>
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
        this.adicionarPlaylist = this.adicionarPlaylist.bind(this);
    }

     adicionarPlaylist() {
        this.props.onAdicionarPlaylist(this.props.linha)
     }

    render() {
        return (
            <tr>
                <td>{this.props.linha.Titulo}</td>
                <td>{this.props.linha.Artista}</td>
                <td>{this.props.linha.Album}</td>
                <td>{this.props.linha.AnoLancamento}</td>
                <td><button type="button" className="btn btn-default btn-sm" onClick={this.adicionarPlaylist}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Adicionar a playlist</button></td>
            </tr>
        );
    }
}


ReactDOM.render(<ComponentePesquisar1/>, div1); // Barra superior
ReactDOM.render(<ComponentePesquisar2/>, div2); // Menu do lado esquerdo
ReactDOM.render(<ComponentePesquisar3/>, div3); // Tabela de músicas