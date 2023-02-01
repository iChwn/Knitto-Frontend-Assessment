import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_KEY = "k_7r8p6wav";
const API_BASE_URL = "https://imdb-api.com/en/API";

const getMovieByName = async (title:string) => {
  const url = `${API_BASE_URL}/Search/${API_KEY}/${title}`;
  try {
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from API');
  }
}

const getMovieById = async (id:string) => {
  const url = `${API_BASE_URL}/Title/${API_KEY}/${id}`;
  try {
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error(error);
      throw new Error('Error fetching data from API');
  }
}

export { getMovieByName, getMovieById };
