import { getStatisticsOverTime } from "../../services/api";

export default function SettingsPage() {

    const handleClick = () => {
        getStatisticsOverTime('bil', 'nn')
            .then(e => console.log(e))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <p>Test</p>
            <button onClick={handleClick}>Click</button>
        </div>
    );
}