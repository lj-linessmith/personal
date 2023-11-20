import { useState, useEffect } from 'react'
import { Album } from '../../models/Albums.ts'
import { getAlbums } from '../apis/apiClient.ts'
import { getAlbums2 } from '../apis/apiClient.ts'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllCustomAlbums } from '../apis/apiClient.ts'
import CustomAlbumListItem from './CustomAlbum.tsx'

export default function Albums() {
  const [albums, setAlbum] = useState([] as Album[])

  useEffect(() => {
    async function fetchAlbum() {
      const albumData = await getAlbums()
      setAlbum(albumData.releases)
      console.log(albumData.releases)
      console.log(albums)
    }
    fetchAlbum()
  }, [])

  const [albums2, setAlbum2] = useState([] as Album[])

  useEffect(() => {
    async function fetchAlbum2() {
      const albumData2 = await getAlbums2()
      setAlbum2(albumData2.releases)
      console.log(albumData2.releases)
      console.log(albums2)
    }
    fetchAlbum2()
  }, [])

  const {
    data: customAlbums,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['Custom Album List'],
    queryFn: getAllCustomAlbums,
  })

  if (error) {
    console.error(error)
    return
  }

  if (isLoading) {
    return (
      <div id="wrap">
        <div id="album">
          <div id="cover">
            <div id="print"></div>
          </div>
          <div id="vinyl">
            <div id="print"></div>
          </div>
        </div>
      </div>
    )
  }

  function checkBoxSet(format: object) {
    if (format.some((e) => e.name === 'Box Set')) {
      return '[Box Set]'
    }
  }

  function getStars(rating) {
    const output = []

    // Append all the filled whole stars
    for (let i = rating; i >= 1; i--) output.push('★')

    // Fill the empty stars
    for (let i = 5 - rating; i >= 1; i--) output.push(' ')

    return output.join('')
  }

  // const array = [
  //   albums.forEach((album) => album),
  //   albums2.forEach((album2) => {
  //     album2
  //   }),
  // ]
  // console.log('array:', array)
  // function removeDuplicates(arr) {
  //   return [...new Set(arr)]
  // }

  // const newArr = removeDuplicates(array)
  // console.log(newArr)

  return (
    <>
      <h1> Custom Albums List</h1>

      {customAlbums?.map((p) => (
        <CustomAlbumListItem
          key={p.id}
          id={p.id}
          title={p.title}
          artists={p.artists.name}
        />
      ))}

      <h1> Discogs Albums List</h1>
      {/* {arr = {albums.map((album) => (album.basic_information.title) )} , {albums2.map((album2) => (album2.basic_information.title))}
  } */}
      {albums.map((album) => (
        <li key={album.basic_information.id}>
          {album.basic_information.title}{' '}
          {checkBoxSet(album.basic_information.formats)} - by:{' '}
          {album.basic_information.artists[0].name}
          <br /> Rating: <b id="star">{getStars(album.rating)}</b>
          {/* <Link to={}>{album.basic_information.title}</Link> */}
        </li>
      ))}
      {albums2.map((album2) => (
        <li key={album2.basic_information.id}>
          {album2.basic_information.title}{' '}
          {checkBoxSet(album2.basic_information.formats)} - by:{' '}
          {album2.basic_information.artists[0].name}
          <br />
          Rating: <b id="star"> {getStars(album2.rating)}</b>
          {/* {
            if (album2.artists[0].name == undefined) {
              {''}
            } 
            else {
               {album2.artists[0].name}
              }
           } */}
        </li>
      ))}
    </>
  )
}
