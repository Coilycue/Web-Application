'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import capture from '../../../public/assests/Capture.png';
import Image from 'next/image';
import reset from '../../../public/assests/reset.png';
import { IoRefresh } from 'react-icons/io5';
import { GrSplit } from 'react-icons/gr';
import { MdOutlineDownloadForOffline } from 'react-icons/md';
import display6 from '../../../public/assests/display6.png';
import { hairstyleDataMen } from '../components/hairstyleData';
import { hairstyleDataFemale } from '../components/hairstyleData';
import { hairColor } from '../components/hairstyleData';
const Page = () => {
  const url = 'https://coilycue-api.onrender.com';
  const LINK =
    'https://www.ailabapi.com/api/portrait/effects/hairstyle-editor-pro';
  const apikey =
    'pmsnJu43qmu1vQgfaNLVKI3eGjJYoBCxddsxZHEkOOKMFSk68FfCMW7tPvnBI9HY';
  const [Hair, SetHair] = useState([]);
  const [State, SetState] = useState([]);
  const [view, setView] = useState('hair');
  const [labell, SetLabel] = useState('');
  const [display, setdisplay] = useState();
  const [upload, setupload] = useState(true);
  const [options, setoptions] = useState(false);
  const [style, setstyle] = useState(false);
  const getHair = () => {
    fetch('https://coilycue-api.onrender.com/images/all')
      .then((response) => response.json())
      .then((data) => {
        let sample = data;
        SetHair(sample);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getHair();
  }, []);
  function handleClick(name, name2) {
    SetState(name), SetLabel(name2);
  }
  const fileInput = useRef(null);
  const picInput = useRef(null);
  //works on handle click for uploads//
  const handleClick2 = (event) => {
    if (!style) {
      alert('PLEASE PICK AN HAIRTYLE');
    } else {
      fileInput.current.click();
    }
  };
  const handleClick3 = (event) => {
    if (!style) {
      alert('PLEASE PICK AN HAIRTYLE');
    } else {
      picInput.current.click();
    }
  };
  function handleClick4() {
    setupload(!upload), setoptions(!options);
  }
  const handleClick5 = (event) => {
    setstyle(event.target.innerText);
  };
  // creating a hairstyle option select//
  //creating an array of hairstyle//
  const [hairstyle, setHairStyle] = useState('');
  const [hairColour, setHairColour] = useState('');
  const hairstyleSelect = (e) => {
    setHairStyle(e.target.value);
     setstyle(e.target.innerText);
  };
  const haircolour = (e) => {
    setHairColour(e.target.value);
  };

  // setting up functions for uploading an image and also sending at the same time//
  // creating a state for storing uploaded images and to trigger a get and post request to AILAB//
  const [imageUpload, setImageUpload] = useState({});
  const [value, setValue] = useState('');
  const uploadImage = (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    setImageUpload(files);
  };
  const submit = async (e) => {
    e.preventDefault();
    console.log(imageUpload);
    console.log(imageUpload);
    const myHeaders = new Headers();
    myHeaders.append('ailabapi-api-key', `${apikey}`);
    const formdata = new FormData();
    formdata.append('task_type', 'async');
    formdata.append('image', imageUpload, 'file');
    console.log(imageUpload);
    formdata.append('hair_style', `${hairstyle}`);
    formdata.append('auto', '1');
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(LINK, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const res1 = JSON.parse(result);
        console.log(res1.task_id);
        setValue(res1.task_id);
        //   const res2 = res1.task_id;
        // var myHeaders = new Headers();
        //   myHeaders.append('ailabapi-api-key',  `${apikey}`);

        //   var requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     redirect: 'follow',
        //   };

        // fetch(
        //    ` https://www.ailabapi.com/api/common/query-async-task-result?task_id=${res2}`,
        //     requestOptions
        //   )
        //     .then((response) => response.text())
        //     .then((result) => console.log(result))
        //     .catch((error) => console.log('error', error));
      })
      .catch((error) => console.log('error', error));
  };
   
  const [error, setErro] = useState();
  const [data, setdata] = useState();
  const getData = async () => {
    console.log(value);
    const taskid = value;
    //  e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('ailabapi-api-key', `${apikey}`);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      `https://www.ailabapi.com/api/common/query-async-task-result?task_id=${taskid}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((message) => {
        const res = JSON.parse(message);
        console.log(res);
        setErro(res.error_msg);
        setdata(res.data);
      })
      .catch((error) => console.log('error', error));
  };
  return (
    <div className='flex flex-col lg:flex-row gap-[2rem] lg:gap-[0rem]  items-center lg:items-start  justify-around mt-[2rem]'>
      <div
        className={` w-[300px] h-[250px] lg:w-[500px] lg:h-[517px] bg-[#D9D9D9]  flex `}
        style={{
          backgroundImage: `url("${display}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <div
          className={
            display
              ? 'flex flex-col gap-[1rem] justify-end items-end pb-[1rem] pr-[1rem] mx-auto w-full'
              : 'hidden'
          }>
          <IoRefresh
            color='white'
            size={30}
            className='cursor-pointer'
          />
          <GrSplit
            color='white'
            size={30}
            className='cursor-pointer'
          />
          <a href={display}>
            <MdOutlineDownloadForOffline
              color='white'
              size={30}
              className='cursor-pointer'
              href={display}
            />
          </a>
        </div>
        <div
          className={
            display
              ? 'hidden'
              : ' w-full items-center justify-end  flex flex-col gap-[1rem] '
          }>
          <div
            className={
              upload == false
                ? 'hidden'
                : 'pl-[0.5rem] flex flex-row gap-[1rem] items-center justify-center'
            }>
            <form>
              <div
                className={
                  style
                    ? 'flex lg:hidden font-Gelasio font-bold p-[0.5rem] bg-white rounded-lg  cursor-pointer'
                    : 'cursor-not-allowed opacity-[0.2] font-Gelasio font-bold p-[0.5rem] bg-white rounded-lg duration-500'
                }
                // to take a picture
                onClick={handleClick3}>
                Take Picture
                <input
                  type='file'
                  accept='image/*'
                  capture='user'
                  className='hidden'
                  // REF links the fucion to input i.e picInput
                  ref={picInput}
                  onChange={uploadImage}
                />
              </div>
              <button
                // type='submit'
                className=' text-black font-bold'
                onClick={submit}>
                Submit
              </button>
            </form>
            <button
              // type='submit'
              className=' text-black font-bold'
              onClick={getData}>
              getpics
            </button>
            {/* to upload a picture */}
            <button
              className={
                style
                  ? 'font-Gelasio font-bold p-[0.5rem] bg-white rounded-lg  cursor-pointer'
                  : 'cursor-not-allowed opacity-[0.2] font-Gelasio font-bold p-[0.5rem] bg-white rounded-lg  duration-500'
              }
              onClick={handleClick2}>
              <input
                type='file'
                ref={fileInput}
                className='hidden'
                // onChange={uploadImage}
              />
              Upload Picture
            </button>
          </div>
          <Image
            src={capture}
            height={60}
            width={60}
            alt='model'
            onClick={handleClick4}
            className='cursor-pointer'
          />
        </div>
      </div>
      {options == true ? (
        <div className='flex flex-col gap-[1rem] items-center justify-center'>
          <div className='w-[200px] h-[50px] lg:w-[600px] bg-primary1 flex flex-row items-center justify-center gap-[2rem]'>
            <h3
              className={
                view === 'hair'
                  ? 'font-Gelasio font-bold text-[18px] text-black cursor-pointer underline underline-offset-4'
                  : 'font-Gelasio font-bold text-[18px] text-black cursor-pointer'
              }
              onClick={() => setView('hair')}>
              Hairstyle
            </h3>
            <h3
              className={
                view === 'color'
                  ? 'font-Gelasio font-bold text-[18px] text-black cursor-pointer underline underline-offset-4'
                  : 'font-Gelasio font-bold text-[18px] text-black cursor-pointer'
              }
              onClick={() => setView('color')}>
              Colours
            </h3>
          </div>
          {view === 'hair' ? (
            <div className='grid grid-cols-4'>
              <div className=' flex items-center justify-center'>
                <Image
                  src={reset}
                  height={60}
                  width={60}
                  alt='model'
                  className='cursor-pointer'
                  onClick={() => setdisplay('')}
                />
              </div>
              {Object.entries(Hair).map(([label, contents], id) => (
                <div
                  key={id}
                  className=''
                  onClick={() => setdisplay(url.concat(contents[0].imageUrl))}>
                  <button
                    className='flex flex-col items-center justify-center p-[1rem]'
                    onClick={() => handleClick(contents, label)}>
                    <img
                      src={url.concat(contents[0].imageUrl)}
                      alt='model'
                      className='rounded-md cursor-pointer h-[70px] w-[70px] lg:w-[160px] lg:h-[160px]'
                    />
                    <h3
                      className={
                        labell === contents[0].hairstyle
                          ? 'text-[14px] font-Lato font-bold text-black'
                          : ' text-[14px] font-Lato font-bold text-gray-400'
                      }>
                      {contents[0].hairstyle}
                    </h3>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-4'>
              <div className=' flex items-center justify-center'>
                <Image
                  src={reset}
                  height={60}
                  width={60}
                  className='cursor-pointer'
                  alt='model'
                  onClick={() => setdisplay('')}
                />
              </div>
              {State.length ? (
                State.map((con, index) => (
                  <div
                    key={index}
                    className='flex flex-col items-center justify-center p-[1rem]'
                    onClick={() => setdisplay(url.concat(con.imageUrl))}>
                    <Image
                      src={url.concat(con.imageUrl)}
                      height={166}
                      width={177}
                      className='rounded-md cursor-pointer'
                    />
                    <h3 className='text-[14px] font-Lato font-bold text-black'>
                      {con.color}
                    </h3>
                  </div>
                ))
              ) : (
                <div className='  w-full'>
                  {' '}
                  <h3 className='text-center text-[15px] font-Lato text-black font-bold'>
                    PLEASE PICK AN HAIRSTYLE
                  </h3>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='grid gap-4 grid-cols-4'>
          {/* <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          <button
            className='font-Gelasio font-bold cursor-pointer p-[0.5rem] rounded-lg bg-gray-600 text-white'
            onClick={handleClick5}>
            undercut
          </button>
          {console.log(style)} */}
          <div>
            <h1>Select Hairstyle for Men</h1>
            <select onChange={hairstyleSelect}>
              {hairstyleDataMen.map((item) => {
                return <option key={item.id}>{item.label}</option>;
              })}
            </select>
            <div>{hairstyle}</div>
          </div>
          <div>
            <h1>Select Hairstyle for Female</h1>
            <select onChange={hairstyleSelect}>
              {hairstyleDataFemale.map((item) => {
                return <option key={item.id}>{item.label}</option>;
              })}
            </select>
            <div>{hairstyle}</div>
          </div>
          <div>
            <h1>Select Colour</h1>
            <select onChange={haircolour}>
              {hairColor.map((item) => {
                return <option key={item.id}>{item.label}</option>;
              })}
            </select>
            <div>{hairstyle}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
