const AboutUsTeam = (props: any) => {

    return (
        <a target="_blank" href={props.linkedIn} rel="noreferrer">
            <img className="h-40 w-40 object-cover rounded-full mx-auto mb-3 shadow-md hover:shadow-lg" src={props.imgUrl} alt={props.name} />
            <h1 className="text-grey-dark font-semibold tracking-wider text-md text-center">{props.name} </h1>
            <h1 className="text-grey-standard tracking-wider text-sm text-center">{props.role} </h1>
        </a>
    )
}

export default AboutUsTeam