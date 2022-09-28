import React, { useState } from 'react'
import Card from '../../shared/card'
import styles from './infouser.module.scss'
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectUser, deleteAccount, userlogout } from "../../redux/authSlice/AuthSlice";
import Loading from '../../shared/loading/Loading';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import withPermission from '../../utils/HOC/withPermission';

const InfoUSer = () => {
  const [loading, setLoading] = useState(false);
  const userState = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDelete = async (id:string) =>{
    setLoading(true)
    await dispatch(deleteAccount(id))
    await dispatch(userlogout())
    setLoading(false)
    navigate('/login')
  }

  const handleEdit = (id:string | undefined ) =>{
    navigate(`/myinfo/edituser/${id}`)
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.superHero}>
      <div className={styles.hero}>
        <div className={styles.userContent}>
            <Card title='Meus Dados'  onEdit={()=> handleEdit(userState.id)} onDelete={()=>handleDelete(userState.id)}>
            <p >
                    <span className={styles.nameField}>Nome:</span>{" "}
                    {userState.name}
            </p>
            <p >
                    <span className={styles.nameField}>Nome:</span>{" "}
                    {userState.email}
            </p>
            <br />
            </Card>
        </div>
      </div>
    </div>
  )
}

export default withPermission(['customer']) (InfoUSer)