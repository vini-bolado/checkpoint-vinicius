import AppCss from './App.module.css'
import AppCssError from './AppError.module.css'
import Card from '../card-component/Card'
import { useState } from 'react';

function App() {
  const [form, setForm] = useState({nome: "", cor: ""});
  const [errorForm, setErrorForm] = useState ("");
  const [cards, setCards] = useState([])

  function onSubmit(event){
    event.preventDefault();
    
    let contemNumero = false;
    
    function isNum(val){
      return !isNaN(val);
    };

    for(let i = 0; i < form.cor.length; i++){
        if(isNum(form.cor[i])){
          contemNumero = isNum(form.cor[i]);
        };
    };

    if(!form.nome.trim() || form.nome.length < 3 || form.cor.length < 6 || !contemNumero){
      setErrorForm("Por favor, verifique os dados inseridos")
    }else{
      setCards([...cards ,{nome: form.nome, cor: form.cor}]);
      setForm({nome: "", cor: ""})
      setErrorForm("");
    }


  }
  return (
    <div className="App">
        <form 
          onSubmit={onSubmit}
          className={errorForm ?  AppCssError.formError : AppCss.form}>
          <h1>ADICIONAR NOVA COR</h1>
          <div className={errorForm ?  AppCssError.containerInputs : AppCss.containerInputs}>
            <div>
              <label htmlFor="nomeCor">Nome</label>
              <br />
              <input  type="text" 
                      name='nomeCor'
                      onChange={(event) => setForm({...form, nome: event.target.value})}
                      value={form.nome}
                    />
            </div>
            <div>
              <label htmlFor="corHex">Cor</label>
              <br />
              <input  type="text" 
                      name='corHex'
                      onChange={(event) => setForm({...form, cor: event.target.value})}
                      value={form.cor}
                      />
            </div>
          </div>
          <button
                type="submit" 
                className= {errorForm.length <= 0 ?  AppCss.buttonEnvio : AppCssError.buttonEnvio}
                disabled = {form.nome.length < 0 && form.cor.length < 0 ? true : false}
                >ADICIONAR</button>
        </form>
      <h3 className= {errorForm ?  AppCssError.tituloError : AppCss.tituloError} >{errorForm}</h3>
      <div className={AppCss.containerCards}>
        <div className={AppCss.boxTitulo}>
          <h2>CORES FAVORITAS</h2>
        </div>
        {
          cards.map((card, index) => 
            <Card
                  key = {index} 
                  nome = {card.nome} 
                  cor = {card.cor}
                />
            )
        }
      </div>
    </div>
  );
}

export default App;