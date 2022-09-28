import React from 'react'
import withPermission from '../../utils/HOC/withPermission'
import styles from './developed.module.scss'
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import developedPicture from '../../assets/developed.png'
const Developed = () => {
  return (
    <div className={styles.Container}>
        <div className={styles.wrapPicture}>
            <img src={developedPicture} alt="" className={styles.picture} />
        </div>
        <div className={styles.wrapContent}>
        <div className={styles.heroContent}>
            <h2 className={styles.hello} data-aos="fade-right">
              Olá, Eu Sou
            </h2>
            <h1 className={styles.name} data-aos="fade-right">
              SILAS SOUSA
            </h1>
            <h2 className={styles.office} data-aos="fade-left">
              Desenvolvedor Web Full-Stack
            </h2>
            <h4 className={styles.desc} data-aos="fade-left">
            Moro em Salvador-BA e tenho 28 anos. Estudo e pratico programação a 2 anos desenvolvendo sites responsivos e dinâmicos em React ou Angular no front-end e com NodeJs no back-end.  Além disto, curso Analise e Desenvolvimento de Sistemas na Unifacs. Gosto e me sinto confortável em trabalhar em equipe e entregar valor para a equipe, para o cliente e para a empresa como um todo. A ideia de unir tecnologia + pessoas motivadas e dedicadas para construir algo de valor me inspira muito nesta caminhada. <span className={styles.contacts}>Entre em contato comigo </span> e vamos bater um papo, <span className={styles.contacts}>segue meus contatos:</span>  
            </h4>
            <a href="https://drive.google.com/drive/folders/1U8zGDqgS1B4MLeP30Q7Hgq-eS1PZW2DM?usp=sharing">
            <button className={styles.primaryBtn} data-aos="fade-right">
              Download do CV
            </button>
            </a>
            <div className={styles.wrapIcons} data-aos="fade-right">
              <a href="https://web.whatsapp.com/71993868658" target= "_blank" rel="noreferrer">
                <WhatsAppIcon className={styles.icon} />
              </a>
              <a href="https://www.linkedin.com/in/silassousadejesus/" target= "_blank" rel="noreferrer">
                <LinkedInIcon className={styles.icon} />{" "}
              </a>
              <a href="mailto:silassousadejesus@gmail.com" target= "_blank" rel="noreferrer">
                <ForwardToInboxIcon className={styles.icon} />
              </a>
            </div>
          </div>
        </div>   
    </div>
  )
}

export default withPermission(['customer']) (Developed)