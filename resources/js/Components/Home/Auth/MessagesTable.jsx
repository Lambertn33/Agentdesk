import React from 'react'

const MessagesTable = ({receivedMessages}) => {
    return (
        

<div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-white">
    <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-white">
            <tr>
                <th scope="col" class="px-6 py-3 font-medium text-white">
                    Message
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-white">
                    Status
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-white">
                    Received date
                </th>
            </tr>
        </thead>
        <tbody>
            {
                receivedMessages.map(({message, is_read, created_at})=> (
                    <tr class="bg-neutral-primary border-b border-white">
                        <td class="px-6 py-4 text-white">
                            {message}
                        </td>
                        <td class="px-6 py-4 text-white">
                            {
                                !is_read ?
                                <span className="bg-yellow-600  text-xs font-medium px-1.5 py-0.5 rounded">unread</span>
                                :
                                <span className="bg-green-600  text-xs font-medium px-1.5 py-0.5 rounded">read</span>
                            }
                        </td>
                        <td className="px-6 py-4 text-white">
                            {new Date(created_at).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </td>

                    </tr>
                ))
            }
        </tbody>
    </table>
</div>

    )
}

export default MessagesTable