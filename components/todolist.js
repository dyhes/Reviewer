import { DatePicker, Empty, Result,Button,Skeleton, Space,List } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "../styles/todo.module.less";
import Todo from "./todo";
import inspirecloud from '../services/inspirecloud'
const now=new Date()
const todayString=now.getFullYear()+'-'+(now.getMonth()<9?'0':'')+(now.getMonth()+1)+'-'+(now.getDate()<10?'0':'')+now.getDate()
const curMom=moment(now, "YYYY/MM/DD")
export default function TodoList() {
  const [date, setDate] = useState(todayString)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const handleCount=()=>{
    setCount(count-1)
  }
  useEffect(() => {
    setLoading(true)
    inspirecloud.run('getTodo',{date:date})
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(isLoading)
        setCount(data.result.length)
      })
  }, [date])
  const handleDateChange = (momen, dateString) => {
    setDate(dateString)
  };
  if (isLoading) return <Skeleton active  style={{width:'50vw'}}/>;
  if (!data)  return (
    <Result
      status="500"
      title="无法加载任务清单"
      extra={
        <Button type="primary" onClick={e=>{e.preventDefault()
        location.reload()}}>
          重试
        </Button>
      }
    />
  );
  const todos = data.result;
  console.log(todos);
  return (
    <div className={styles["list"]}>
      <DatePicker
        defaultValue={moment(date, "YYYY/MM/DD")}
        onChange={handleDateChange}
        allowClear={false}
        style={{margin:'5vh'}}
      />
      <div>
        {todos.length === 0||count===0 ? (
          <Empty description="今日任务已全部完成" />
        ) : (
          <List
      header={<div>任务清单</div>}
      bordered
      dataSource={data.result}
      renderItem={item => (
        <Todo todo={item} handleCount={handleCount}/>
      )}
    />
        )}
      </div>
    </div>
  );
}