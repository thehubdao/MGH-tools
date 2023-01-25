import axios from "axios";

export async function requestGet(url: string, origin?: string) {
    return new Promise((resolve, reject) => {
        axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => { resolve(response.data) })
        .catch(err => { reject(err) });
    });
}

export async function requestPost(url: string, body: any, origin?: string) {
    return new Promise((resolve, reject) => {
        axios.post(url, body, { headers: { 'Content-Type': 'application/json' } })
        .then(response => { resolve(response.data) })
        .catch(err => { reject(err) });
    });
}

export async function requestPut(url: string, body: any, origin?: string) {
    return new Promise((resolve, reject) => {
        axios.put(url, body, { headers: { 'Content-Type': 'application/json' } })
        .then(response => { resolve(response.data) })
        .catch(err => { reject(err) });
    });
}

export async function requestDelete(url: string, origin?: string) {
    return new Promise((resolve, reject) => {
        axios.delete(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => { resolve(response.data) })
        .catch(err => { reject(err) });
    });
}