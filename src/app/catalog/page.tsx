"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import search from "../../../public/images/search.svg";
import "../product/product.css";
import axios from "axios";

interface RefType {
  current: HTMLDivElement | null;
}

export default function Products(): JSX.Element {
  const [catalog, setCatalog] = useState([]);

  const title = useRef<any>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response2 = await fetch("http://localhost:1212/api/catalogs");
  //       const data2 = await response2.json();
  //       setCatalog(data2);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const hendlepic = async () => {

      const data = {
        catalogName : title.current.value,
      }
      try {
        fetch("http://localhost:1212/api/catalogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.errors) {
              console.log(data.errors);
            } else {
              console.log(data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    hendlepic();
  };

  return (
    <>
      <div className="container">
        <div>
          <h1 className="header fount p-5">Catalogs</h1>
        </div>
        <div className="body_Wrapper">
          <form className="pl-8 mb-20 p-8" onSubmit={handleSubmit}>
            <h2 className="form_title fount mb-8">Add new catalog</h2>
            <ol className="flex items-center justify-between mb-8">
              <li>
                <label className="block fount">catalogName</label>
                <input
                  ref={title}
                  type="text"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="catalogName"
                />
              </li>
              <div className="mt-auto">
                <button
                  className="submit h-12 bg_fount text-center rounded-lg"
                  type="submit"
                >
                  Qo’shish
                </button>
              </div>
            </ol>
          </form>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="form_title pl-8">Bizning o’quvchilar</h2>
              <div className="search pl-4 w-80 rounded-lg">
                <Image
                  className="inline"
                  src={search}
                  alt=""
                  width={18}
                  height={18}
                />
                <input
                  className="inline border-none pt-2 pb-2 w-64"
                  type="input"
                  placeholder="Search"
                />
              </div>
            </div>
            <ol className="m-0 p-0">
              <li className="sidebar flex items-center justify-between p-4">
                <p className="sidebar_text">№</p>
                <p className="sidebar_text1">O’quvchi ismi</p>
                <p className="sidebar_text">Telefon nomer</p>
                <p className="sidebar_text">Yo’nalish</p>
                <p className="sidebar_text">Ota-ona(F.I.SH)</p>
                <p className="sidebar_text">Ota-ona (Tel)</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}