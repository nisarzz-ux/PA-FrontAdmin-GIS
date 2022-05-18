import React,{useState,Component} from 'react';
import {Form , Button } from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddFormDemografi = () => {
    
    const[kecamatan,setKecamatan] = React.useState();
    const[bagian_wilayah,setBagianWilayah] = React.useState();
    const[penduduk_laki,setPendudukLaki] = React.useState();
    const[penduduk_wanita,setPendudukWanita] =  React.useState();
    const[lat_koordinat,setLatKoordinat] = React.useState();
    const[long_koordinat,setLongKoordinat] = React.useState();
    const navigate = useNavigate();
    
    
    const tabelDemografi = {
        kecamatan : kecamatan,
        bgnWilayah : bagian_wilayah,
        pendudukLaki : penduduk_laki,
        pendudukWanita : penduduk_wanita,
        latKoordinat : lat_koordinat,
        longKoordinat : long_koordinat
    };

    function submit(e){
        e.preventDefault();
        console.log(tabelDemografi);
        axios.post('http://127.0.0.1:8000/api/demografi/input',
             tabelDemografi
        )
        .then
        (res => {
            console.log(res)
            swal({
             title: "Data Berhasil di masukan!",
             text: "Click the Button!",
             icon: "success",
             button: "back",
            })
            navigate.push("/TableDemografi")
        })
        .catch(error => {
            console.log(error)
            swal({
             title: "Data gagal di masukan!",
             text: "Click the Button!",
             icon: "error",
             button: "back",
            })
         })
     }


    return (
        <Form style={{
            marginTop:"5vw",
            marginLeft:"20vw",
            marginRight:"20vw"
        }}>
            <Form.Group className="mb-1">
                <Form.Label> Masukan Kecamatan </Form.Label>
                <Form.Control type="text" placeholder="Masukan Kecamatan"  onChange = {e => setKecamatan(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label>Masukan Bagian Wilayah </Form.Label>
                <Form.Select type="text" onChange = {e => setBagianWilayah(e.target.value)} >
                    <option>Pilih Bagian Wilayahnya</option>
                    <option value="Surabaya Utara" >Surabaya Utara</option>
                    <option value="Surabaya Selatan">Surabaya Selatan</option>
                    <option value="Surabaya Barat">Surabaya Barat</option>
                    <option value="Surabaya timur">Surabaya timur</option>
                    <option value="Surabaya Pusat">Surabaya Pusat</option>

                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label> Input Jumlah Penduduk Laki-laki </Form.Label>
                <Form.Control type="text" placeholder="Masukan Jumlah Penduduk Laki-Laki" onChange = {e => setPendudukLaki (e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label> Input Jumlah Penduduk Perempuan </Form.Label>
                <Form.Control type="text" placeholder="Masukan Jumlah Penduduk Perempuan" onChange = {e => setPendudukWanita (e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label> Input lattiude Koordinat daerah </Form.Label>
                <Form.Control type="text" placeholder="Masukan Jumlah Penduduk Perempuan" onChange = {e => setLatKoordinat (e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label> Input longttiude Koordinat daerah </Form.Label>
                <Form.Control type="text" placeholder="Masukan Jumlah Penduduk Perempuan" onChange = {e => setLongKoordinat (e.target.value)}/>
            </Form.Group>

            <Button variant = "primary" size="sg" style={{width : "10vw"}} onClick={submit}> 
                Submit Data 
            </Button>
    </Form>
    )
}

export default AddFormDemografi;
