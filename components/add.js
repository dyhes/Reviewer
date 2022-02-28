import { useRef, useState } from "react";
import {
  MessageOutlined,
  CalendarOutlined,
  LinkOutlined,
} from "@ant-design/icons/lib/icons";
import { Form, Input, Button, Modal, message } from "antd";
import inspirecloud from "../services/inspirecloud";
export default function Add() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [task, setTask] = useState("");
  const [remark, setRemark] = useState("");
  const [link, setLink] = useState("");
  const formref=useRef()
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    if (task.length === 0) {
      message.error("任务为必填项");
      setConfirmLoading(false);
    } else {
      inspirecloud.run("addTodo",{
        'task':task,
        'remark':remark,
        'link':link
      }).then((res) => {
        if(res.success){
          message.success('记录成功')
          setTask('')
          setLink('')
          setRemark('')
          formref.current.resetFields()
          setVisible(false);
          setConfirmLoading(false);
        }else{
          message.error('请重试')
          setConfirmLoading(false);
        }
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleTaskChange = (e) => setTask(e.target.value);

  const handleRemarkChange = (e) => setRemark(e.target.value);

  const handleLinkChange = (e) => setLink(e.target.value);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        新添记录
      </Button>
      <Modal
        title="新添记录"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
        ref={formref}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item label="任务" name="task">
            <Input
            id="task"
              prefix={<CalendarOutlined />}
              defaultValue={task}
              onChange={handleTaskChange}
              autoComplete='off'
            />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <Input
            id="remark"
              prefix={<MessageOutlined />}
              defaultValue={remark}
              placeholder="可加入对该记录的备注"
              onChange={handleRemarkChange}
              autoComplete='off'
            />
          </Form.Item>

          <Form.Item label="链接" name="link">
            <Input
            id="link"
              prefix={<LinkOutlined />}
              defaultValue={link}
              placeholder="可将该任务相关线上资料链接加入记录"
              onChange={handleLinkChange}
              autoComplete='off'
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
