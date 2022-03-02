import { Button, Card,message,List} from "antd";
import { useState } from 'react';
import inspirecloud from './../services/inspirecloud';
import styles from "../styles/todo.module.less";

export default function Todo({todo,handleCount}){
  const [visible, setVisible] = useState(true)
  const handleClick=()=>{
    inspirecloud.run('deleteTodo',{id:todo._id}).then(
      (res)=>{
        if(res.success){
          message.success('任务完成')
          handleCount()
          setVisible(false)
        }else{
          message.error('请重试')
        }
      }
    )
  }
    return(
      <>{visible?
        <List.Item>
                <Card title={<div className={styles['todo']}>
                  {todo.task}
                  <Button type="primary" onClick={handleClick}>完成</Button>
                </div>} style={{ width:300}}>
                <p>备注：{todo.remark.length===0?'无':todo.remark}</p>
                <p>链接：{todo.link.length===0?'无':<a href={todo.link} target='_blank' rel="noreferrer">{todo.task}</a>}</p>
              </Card>
              </List.Item>:<></>}</>
    )
}