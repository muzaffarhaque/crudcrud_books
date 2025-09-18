import React, { useEffect, useState } from "react";
import commonGetApi, { commonDeleteApi } from "../server/Api";
import { Modal, Table } from "antd";
import { render } from "react-dom";
import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import NewMemberForm from "../components/NewMemberForm";
import { domain } from "../utils/constent";
import { toast } from "react-toastify";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState("");
  const [searchValue,setSearchValue]=useState('');
  const [perPage,setPerPage]= useState(3);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  async function getData() {
    const data = await commonGetApi(
      `${domain}/books`
    );
    // console.log(data);
    setData(data.data.reverse());
    setData2(data.data.reverse());
  }
  useEffect(() => {
    getData();
  }, []);

  // ====================================  MODAL FUNCTION START =================

  const showModal = (id = "") => {
    setIsModalOpen(true);
    setDeleteId(id);
  };
  const handleOk = async () => {
    if (deleteId) {
      const res = await commonDeleteApi(
        `${domain}/books/${deleteId}`
      );
      if (res.status >= 200 && res.status < 300) {
        setDeleteId('');
        getData();
        toast.success("Book deleted successfully!");
      }else{
         toast.error("Error submitting the form!");
        console.error("Failed to delete the book. Status:", res.status);
      }
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const memberHandleOk = () => {
    setEditData('')
    getData();
    setIsMemberModalOpen(false);
  };
  const memberHandleCancel = () => {
    setIsMemberModalOpen(false);
  };
  // ====================================  MODAL FUNCTION END =================
  const HighlightText = (text, highlight) => {
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "#ffa5005e" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
       render: (text, record, index) => record.title ? HighlightText(record.title,searchValue) : '-'
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Published Year,",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, data) => (
        <div className=" d-flex align-items-center gap-3">
          <EditFilled
            className=" pointer"
            onClick={() => {
              setIsMemberModalOpen(true);
              setEditData(data);
            }}
          />
          <DeleteFilled
            onClick={() => showModal(data?._id)}
            className="delete-cion text-danger pointer"
          />
        </div>
      ),
    },
  ];


 
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <section className="main-home-section">
      {/* <header className="header"></header> */}
      <div className="member-table-section container">
        <h4 className="fs-28-18 fw-semibold py-3">All books</h4>
        <div className="table-wrapper">
          <div className="table-header">
            <input
              type="text"
              className="input-box fs-16-13 "
              placeholder="Qa"
              value={searchValue}
              onChange={(e)=>{
                setSearchValue(e.target.value)
                if(e.target.value){
               const filterData = data?.filter((ele) =>
                 ele.title?.toLowerCase().includes(e.target.value.toLowerCase())
               );
               setData(filterData);
                }else{
                  setData(data2)
                }
              
              }
              }
            />
            <button
              className="primary-btn fs-16-13"
              onClick={() => setIsMemberModalOpen(true)}
            >
              {" "}
              Add New Member{" "}
            </button>
          </div>
          <div className="sub-table-container">
            <Table
              dataSource={data}
              columns={columns}
              pagination={{
                pageSize:perPage,
                showSizeChanger: true,
                pageSizeOptions: ['3','5', '10', '20', '30'],
                onShowSizeChange: (current, size) => {
                  console.log(current, size);
                  setPerPage(size);
                },
              }}
              locale={{
                emptyText: 'No Data Found',
              }}
              scroll={{ x: 800 }}

            />
            
          </div>
        </div>
      </div>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        className="custom-delete-modal"
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Yes Delete it!"
      >
        <div className="modal-delete-frame text-center">
          <ExclamationCircleOutlined className="exclamation-icon mx-auto" />
          <h3 className=" fs-14-12 fw-bold text-center py-3 mb-0">
            Are you sure?
          </h3>
          <p className=" fs-14-12 fw-regular text-center ">
            {" "}
            If you delete this Book then this action can not be undone.
          </p>
        </div>
      </Modal>
      <Modal
        title={editData?"Edit New Book":"Add New Book"}
        open={isMemberModalOpen}
        className="custom-member-modal"
        onCancel={memberHandleCancel}
        footer={null}
      >
        <NewMemberForm onOk={memberHandleOk} editData={editData} />
      </Modal>
    </section>
  );
}
