class ComponenteLogin1 extends React.Component {
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

class ComponenteLogin2 extends React.Component {
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
                            <h3 className="panel-title">Login</h3>
                        </div>
                        <div className="panel-body">
                            <div className="col-md-3"></div>
                            <div className="col-md-6" align="center">
                                <form className="form-signin" action="login" method="post">
                                    <input type="email" name="email" className="form-control" placeholder="Email" required />
                                    <input type="password" name="password" className="form-control" placeholder="Password" required />
                                    <p></p>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit"> Login</button>
                                    <p></p>
                                    Não tem conta? <button className="btn btn-default btn-xs" type="button"><a href="registar.html">Criar conta</a></button>
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


ReactDOM.render(<ComponenteLogin1/>, div1); // Título
ReactDOM.render(<ComponenteLogin2/>, div2); // Formulário login