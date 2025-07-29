export default function Skeleton() {

    const SkeletonArr = Array(150).fill(0)
    return (
        <ul className="list-properties">
            {SkeletonArr.map((skeleton, index)=>{
                return (   
                    <li key={index} className="property"></li>
                )
            })}
        </ul>
    );
  }
