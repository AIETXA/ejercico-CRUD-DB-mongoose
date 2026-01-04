export const getTaskStyles = (task) => {
    if(task.completed) {
        return {
            border: 'border-l-4 border-blue-500',
            bg: 'bg-blue-500/10'

        };
    }

    switch(task.priority) {
        case 'high':
            return {
                border: 'border-l-4 border-red-500',
                bg: 'bg-red-500/10'
            };
        case 'medium':
            return {
                border: 'border-l-4 border-amber-500',
                bg: 'bg-amber-500/10'
            };
        case 'low':
            return {
                border: 'border-l-4 border-emerald-500',
                bg: 'bg-emerald-500/10'
            };
        default:
            return {
                border: 'border-l-4 border-slate-600',
                bg: 'bg-slate-800'
            };            
    }
};

