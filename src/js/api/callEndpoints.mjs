export async function fetchApiData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return response;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
  
  export async function postData(url, data, token) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });
  
      return response;
    } catch (error) {
      throw new Error('Error posting data:', error);
    }
  }
  
  export async function getData(url, token) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return response;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
  
  export async function deleteData(url, token) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      
      return null;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
  
  export async function updateData(url, data, token) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });
  
      return response;
    } catch (error) {
      throw new Error('Error posting data:', error);
    }
  }