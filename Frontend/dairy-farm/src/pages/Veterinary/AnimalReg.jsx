import React, { useEffect, useState } from 'react';
import '../../styles/registery.css';
import Swal from 'sweetalert2';
import axios from "axios";
import CustomizedTables from '../../components/Veterinary/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import RegisterForm from '../../components/Veterinary/register_form';

axios.defaults.baseURL = "http://localhost:3000/api/animalReg/";

function AnimalRegistry() {
    const [addSection, setAddSection] = useState(false);
    const [editSection,setEditSection]=useState(false);
    const [formData, setFormData] = useState({
        earTag: "",
        location: "",
        gender: "",
        status: "",
        age: "",
        name: "",
        weight: null,
        breed: "",
        color: "",
        birthDate: null,
    });
    const [formDataEdit, setFormDataEdit] = useState({
        earTag: "",
        location: "",
        gender: "",
        status: "",
        age: "",
        name: "",
        weight: null,
        breed: "",
        color: "",
        birthDate: null,
        _id:""
    });
    const [dataList, setDataList] = useState([]);

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post("/create", formData);
            if (data.data.success) {
                setAddSection(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfuly added",
                    showConfirmButton: false,
                    timer: 1500
                  });
                getFetchData();
            }
        } catch (error) {
            console.error("Error adding animal:", error);
            alert("Error adding animal. Please try again later.");
        }
    };

    const getFetchData = async () => {
        try {
            const response = await axios.get("/retrieve");
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Error fetching data. Please try again later.");
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            
            
               
                
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const deleteResponse = await axios.delete(`/delete/${id}`);
                        getFetchData();
                        if (deleteResponse.data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete the file.",
                                icon: "error"
                            });
                        }
                    }
                });
            
        } catch (error) {
            console.error("Error deleting animal:", error);
            alert("Error deleting animal. Please try again later.");
        }
    };
    
    
    const handleUpdate = async () => {
    try {
        const response = await axios.put(`/update/${formDataEdit._id}`, formDataEdit); 
        if (response.data.success) {
            getFetchData();
            alert(response.data.message);
            setEditSection(false);
        }
    } catch (error) {
        console.error("Error updating animal:", error);
        alert("Error updating animal. Please try again later.");
    }
};
    
    const handleEditOnChange=async(e)=>{
        const { value, name } = e.target;
        setFormDataEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`/retrieve/${id}`);
            if (response.data.success) {
                setFormDataEdit({ ...response.data.data, _id: id }); // Include _id in formDataEdit
                setEditSection(true);
            }
        } catch (error) {
            console.error("Error fetching animal data:", error);
            alert("Error fetching animal data. Please try again later.");
        }
    };
    
    

    const headers = [
        "Ear Tag",
        "Location",
        "Gender",
        "Status",
        "Age",
        "Name",
        "Weight",
        "Breed",
        "Color",
        "Birth Date",
        "Action",
    ];

    return (
        <div >
            {!addSection && !editSection && (
                <div className='container'>
                    <button className='addbtn' onClick={() => setAddSection(true)}>Add New Animal</button>
                </div>
            )}
   
            <div className='form'>
                {addSection && (
                    <RegisterForm
                    handleSubmit={handleSubmit}
                    handleOnChange={handleOnChange}
                    handleClose={() => setAddSection(false)}
                    rest={formData}
                />
                )}
                {editSection && (
                    <RegisterForm
                        handleSubmit={() => handleUpdate(formDataEdit._id)}
                        handleOnChange={handleEditOnChange}
                        handleClose={() => setEditSection(false)}
                        rest={formDataEdit}
                    />
                )}
              </div>  
            
            {!addSection && !editSection &&(
                <div className='table'>
                    <CustomizedTables
                        headers={headers}
                        rows={dataList.length > 0 ? dataList.map(item => ({
                            "Ear Tag": item.earTag,
                            "Location": item.location,
                            "Gender": item.gender,
                            "Status": item.status,
                            "Age": item.age,
                            "Name": item.name,
                            "Weight": item.weight,
                            "Breed": item.breed,
                            "Color": item.color,
                            "Birth Date": item.birthDate,
                            "Action": (
                                <div>
                                    <IconButton onClick={() => handleEdit(item._id)} style={{ color: 'blue' }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(item._id)} style={{ color: 'red' }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )
                        })) : [{ "No Data": "No Data" }]}
                    />
                </div>
            )}
        </div>
    );
}

export default AnimalRegistry;
