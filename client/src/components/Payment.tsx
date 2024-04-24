const Payment = () => {

    const handlePayment = async () => {
        const response = await fetch("http://localhost:3000/api/stripe/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        localStorage.setItem("sessionId", JSON.stringify(data.sessionId))
        window.location = data.url
    }

    return (
        <div>
            <button onClick={handlePayment}>Go to purchase</button>
        </div>
    )
}

export default Payment