import { useParams } from "react-router"

function Account() {
    let params = useParams()
    console.log(params)
    return(
        <>
            <h1>
               Profile: {params.name}
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo corporis quasi consectetur delectus! In temporibus adipisci quam voluptatibus quasi ullam neque animi assumenda at aliquam, dolorum quibusdam quo numquam eveniet.
            </p>
        </>
    )
}

export default Account