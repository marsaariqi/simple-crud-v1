
import EditDeleteIcon from './EditDeleteIcon';


const getToDo = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  // await new Promise(resolve => setTimeout(resolve, 2000))
  try {
    const res = await fetch(`${baseUrl}/api/todos`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch ToDo")
    }

    return res.json();
  } catch (e) {
    console.log("Error loading ToDo: ", e)
  }
};


const CardToDo = async () => {
  const { todo } = await getToDo();

  return (
    <>
      {todo.map((t: any) => {
        const updatedAtDate = new Date(t.updatedAt);
        const day = updatedAtDate.getDate();
        const monthAbbreviation = updatedAtDate.toLocaleString('en-us', { month: 'short' }).toUpperCase();
        const dayAbbreviation = `${monthAbbreviation} - ${day}`;

        return (
          <div key={t._id} className={`card w-72 bg-base-100 shadow-xl card-bordered rounded-3xl border-4 ${t.prio === 'high' ? 'border-red-400' : 'border-orange-200'}`}>
            <div className="card-body overflow-auto">
              <h2 className="card-title justify-between text-pretty overflow-hidden text-overflow-ellipsis">
                {t.title}
              </h2>
              <div className="badge badge-secondary justify-start font-bold">{dayAbbreviation}
              </div>
              <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <p>
                <pre className='whitespace-pre-line text-pretty break-word overflow-hidden text-overflow-ellipsis'>{t.desc}</pre>
              </p>
              <div className="card-actions justify-end">
                <EditDeleteIcon id={t._id} title={t.title} desc={t.desc} prio={t.prio} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CardToDo;