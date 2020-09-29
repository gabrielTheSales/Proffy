import React, {useState, FormEvent} from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import waringIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';

function TeacherForm(){
  
const [name, setName] = useState('');
const [avatar, setAvatar] = useState('');
const [whatsapp, setWhatsapp] = useState('');
const [bio, setBio] = useState('');

const [subject, setSubject] = useState('');
const [cost, setCost] = useState('');

const [scheduleitems, setScheduleItems] = useState([
  {week_day: 0, from: '',to: ''}
]);


//**********Funções*************************** */
  function addNewScheduleItem(){
    try {
      setScheduleItems([
        ...scheduleitems,
        {week_day: 0, from: '',to: ''}
      ]);
    
     console.log("deu certo, adicionou");
    } catch (error) {
      console.log(error)
    }
  }


  function setScheduleItemValue(position: number, field: string, value: string){
    const updatedScheduleItems = scheduleitems.map((scheduleitem, index) =>{
      if(index === position){
        return {...scheduleitem, [field]: value}
      }
      else{
        return scheduleitem;
      }

    });
    
    setScheduleItems(updatedScheduleItems);
   
}

  function handleCreatedClass(e: FormEvent){
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleitems
    }).then(() => {
      alert("Cadastro realizado!");
      window.location.assign(window.location.origin);
    }).catch(()=>{
      alert("Error ao cadastrar!");
    });

    console.log({
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      scheduleitems
    });
  }



//************************************* */


    return(

        <div id="page-teacher-form" className="container">
          <PageHeader 
          title="Que incrível que você quer dar aulas."
          description="O primeiro passo é preencher esse formulário de inscrição!"
          />

          <main>
            <form onSubmit={handleCreatedClass}>
            <fieldset>
              <legend>Seus Dados</legend>

              <Input 
                name="name" 
                label="Nome Completo" 
                value={name} 
                onChange={(e) => {setName(e.target.value) }}
                />
              
              <Input 
                name="avatar" 
                label="Avatar" 
                value={avatar} 
                onChange={(e) => {setAvatar(e.target.value) }}
                />
              
              <Input 
                name="whatsapp" 
                label="WhatsApp" 
                value={whatsapp} 
                onChange={(e) => {setWhatsapp(e.target.value) }}
                />
              
              <Textarea 
                name="bio" 
                label="Biografia"
                value={bio} 
                onChange={(e) => {setBio(e.target.value) }}
                />              
            </fieldset>

            <fieldset>
              <legend>Sobre a Aula</legend>

              <Select 
              name="subject" 
              label="Matéria" 
              options={[
                {value:'Português', label: 'Português'},
                {value:'Matemática', label: 'Matemática'},
                {value:'História', label: 'História'},
                {value:'Inglês', label: 'Inglês'},
                {value:'Geografia', label: 'Geografia'},
                {value:'Física', label: 'Física'},
                {value:'Biologia', label: 'Biologia'},
                {value:'Educação Física', label: 'Educação Física'},
                {value:'Espanhol', label: 'Espanhol'},
                {value:'Química', label: 'Química'},
                {value:'Artes', label: 'Artes'},
              ]}
              value={subject}
              onChange={(e) => {setSubject(e.target.value) }}
              />

              <Input 
                name="cost" 
                label="Custo por Hora"
                value={cost}
                onChange={(e) => {setCost(e.target.value) }}
                />
              
            </fieldset>

            <fieldset>
              <legend>
                Horários Disponíveis
                <button type="button" onClick={addNewScheduleItem}> + Novo Horario </button>
              </legend>

             {scheduleitems.map((scheduleitem, index)  => {
               return(

                <div key={scheduleitem.week_day} className="schedule-item">
                <Select 
                name="week_day" 
                label="Dia da Semana"
                value={scheduleitem.week_day} 
                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                options={[
                  {value:'0', label: 'Domingo'},
                  {value:'1', label: 'Segun-Feira'},
                  {value:'2', label: 'Terça-Feira'},
                  {value:'3', label: 'Quarta-Feira'},
                  {value:'4', label: 'Quinta-Feira'},
                  {value:'5', label: 'Sext-Feira'},
                  {value:'6', label: 'Sábado'},
                  ]}
                />

                  <Input 
                  name="from" 
                  label="Das:"
                  value={scheduleitem.from} 
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                  type="time"/>

                  <Input 
                  name="to" 
                  label="Até:" 
                  value={scheduleitem.to}
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                  type="time"/>
                </div>
               

               );
             })}

            </fieldset>

            <footer><p><img src={waringIcon} alt="Aviso Importante!"/>
            Importante!
            <br/>
            Preencha todos os dados!
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
            </footer>
            </form>
          </main>

        </div>
    )
}

export default TeacherForm;