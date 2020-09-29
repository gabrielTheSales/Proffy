import React from 'react';


import './styles.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher{
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;

}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    function creteNewConnection(){
      api.post('connections',{
        user_id: teacher.id,
      })
    }
  
    return(
        <article className="teacher-item">
        <header>
          <img src={teacher.avatar} alt={teacher.name}/>
       <div>
         <strong className='prof-name'>{teacher.name}</strong>
         <span className='materia-name'>{teacher.subject}</span>
       </div>
        </header>
          <p className='describle-materia'>
            {teacher.bio}
          </p>

          <footer>
            <p>
              Preço/Hora
              <strong>R${teacher.cost}</strong>
            </p>
            <a onClick={creteNewConnection} target="_blank" rel="noopener noreferrer" href={'https://wa.me/'+teacher.whatsapp}> 
              <img src={whatsappIcon} alt="WhatsApp"/>
              Entrar em contato
            </a>
          </footer>
      </article>
      
    );
}

export default TeacherItem;