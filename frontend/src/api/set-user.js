const setUser = async (user) => {
    try {
        const response = await fetch('http://localhost:3000/set-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        return data;
    }
    catch (err) {
        console.log(err);

        return {
            status: 'failed',
        }
    }
}

export default setUser;