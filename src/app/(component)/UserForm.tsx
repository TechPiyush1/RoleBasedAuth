// "use client"

// import React,{ ChangeEvent,FormEvent, useState } from "react"
// import { useRouter } from "next/router"


// interface UserProp {
//     name:string,
//     password:string,
//     email:string,
// }

// export function UserForm() {
//     const router = useRouter();
//     const [formData, setFormData] = useState<UserProp>({name:"",
//         password:"",
//         email:"",});
//     const [errorMessage, setErrorMessage] = useState("");

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         const name = e.target.name;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         setErrorMessage("");
//         const res = await fetch("/api/Users", {
//             method: "POST",
//             body: JSON.stringify({ formData }),
//             "content-type": "application/json",
//         });
//     };


//     return (<>
//         <form
//             onSubmit={handleSubmit}
//             method="post"
//             className="flex flex-col gap-3 w-1/2"
//         >
//             <h1>Create New User</h1>
//             <label>Full Name</label>
//             <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 onChange={handleChange}
//                 required={true}
//                 value={formData.name}
//                 className="m-2 bg-slate-400 rounded" />
//             <label>Email</label>
//             <input
//                 id="email"
//                 name="email"
//                 type="text"
//                 onChange={handleChange}
//                 required={true}
//                 value={formData.email}
//                 className="m-2 bg-slate-400 rounded" />
//             <label>Password</label>
//             <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 onChange={handleChange}
//                 required={true}
//                 value={formData.password}
//                 className="m-2 bg-slate-400 rounded" />
//             <input
//                 type="submit"
//                 value="Create User"
//                 className="bg-blue-300 hover:bg-blue-100" />
//         </form>
//         <p className="text-red-500">{errorMessage}</p>
//     </>);

// }
"use client"

import React,{ ChangeEvent,FormEvent, useState } from "react"
import { useRouter } from "next/navigation"


export interface UserProp {
    name:string,
    password:string,
    email:string,
}

export function UserForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<UserProp>({name:"",
        password:"",
        email:"",});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        const formEvent = e as FormEvent<HTMLFormElement>;
        e.preventDefault();
        setErrorMessage("");
        const res = await fetch("/api/Users", {
            method: "POST",
            body: JSON.stringify({ formData }),
            headers: {
              "Content-Type": "application/json",
            },
          });


    if (!res.ok) {
        const response = await res.json();
        setErrorMessage(response.message);
      } else {
        router.refresh();
        router.push("/");
      }
    };
    

    return (<>
        <form
            onSubmit={handleSubmit}
            method="post"
            className="flex flex-col gap-3 justify-center p-28"
        >
            <h1>Create New User</h1>
            <label>Full Name</label>
            <input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.name}
                className="m-2 bg-slate-800 rounded text-white w-full h-12 " />
            <label>Email</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.email}
                className="m-2 bg-slate-800 rounded text-white w-full h-12 " />
            <label>Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                required={true}
                value={formData.password}
                className="m-2 bg-slate-800 rounded text-white w-full h-12 " />
            <input
                type="submit"
                value="Create User"
                className="bg-blue-300 hover:bg-blue-100  w-full h-12 " />
        </form>
        <p className="text-red-500">{errorMessage}</p>
    </>);

}