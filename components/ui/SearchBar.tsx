
export default function SearchBar(){
    async function handleSubmit(formData:FormData){
        const {...data} = Object.fromEntries(formData)
        
        try{
            const res = await fetch('http://localhost:3000/api/collections', {
                method: "GET",
                body: JSON.stringify(data)
            });

            if(res.ok){
                console.log(`Searched with ${data}`)
            }

        }catch(err){
            console.log("[search_bar_error]", err)
        }

    }

    
    return (
        <>
        <form action={handleSubmit}>
        <label>Search</label>
        <input name="search" id="search" type="string" placeholder="Search your favourite things..." />
        <button type="submit" className="bg-blue-600 text-white border-0 px-6">Search</button>
        </form>
        </>
    )
    }