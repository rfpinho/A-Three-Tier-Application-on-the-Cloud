class ComponenteRegistar1 extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container text-center">
                <h1><b>Projeto ES</b></h1>
                <hr style={{height: "2px", width : "100%", backgroundColor: "#333"}}/>
                <br/><br/><br/><br/>
            </div>
        );
    }
}

class ComponenteRegistar2 extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="col-md-12 vertical-center">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Registar conta</h3>
                        </div>
                        <div className="panel-body">
                            <div className="col-md-3"></div>
                            <div className="col-md-6" align="center">
                                <form className="form-signin" action="utilizador" method="post">
                                    <input type="text" name="nome" className="form-control" placeholder="Nome" required />
                                    <input type="email" name="email" className="form-control" placeholder="Email" required />
                                    <input type="password" name="password" className="form-control" placeholder="Password" required />
                                    <input type="number" name="telefone" className="form-control" placeholder="Telefone" required />
                                    <p></p>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit"> Registar</button>
                                    <p></p>
                                    Pretende voltar à página de login? <button className="btn btn-default btn-xs" type="button"><a href="login.html">Voltar</a></button>
                                </form>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}


ReactDOM.render(<ComponenteRegistar1/>, div1); // Título
ReactDOM.render(<ComponenteRegistar2/>, div2); // Formulário registar conta