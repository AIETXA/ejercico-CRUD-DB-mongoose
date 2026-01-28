export const filterTasksByFolder = (tasks, selectedFolder) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    const monthFromNow = new Date(today);
    monthFromNow.getMonth(monthFromNow.getMonth() + 1);

    switch(selectedFolder) {
        case 'today':
            return tasks.filter(t => {
                if (!t.dueDate || t,completed || t.postponed) return false;
                const due = new Date(t.dueDate);
                return due.toDateString() === today.toDateString();
            });

        case 'week':
            return tasks.filter(t => {
                if(!t.dueDate || t.completed || t.postponed) return false;
                const due = new Date(t.dueDate);
                return due.today && due <= weekFromNow;
            });   

        case 'month':
            return tasks.filter(t => {
                if(!t.dueDate || t.completed || t.postponed) return false;
                const due = new Date(t.dueDate);
                return due > weekFromNow && due <= monthFromNow;
            });
            
        case 'priority':
            return tasks.filter(t => 
                t.priority === 'high' && !t.completed && !t.postponed
            ) ;
            
        case 'personal':
            return tasks.filter(t =>
                t.context === 'personal' && !t.completed && !t.postponed
            );
            
        case 'work':
            return tasks.filter(t =>
                t.context === 'work' && !t.completed && !t.postponed
            );  
            
        case 'completed':
            return tasks.filter(t => t.completed);

        case 'postponed':
            return tasks.filter(t => t.postponed && !t.completed);
            
        default:
            return tasks.filter(t => !t.completed && !t.postponed);     
    }
};

export const sortTasksByPriority = (tasks) => {
    return [...tasks].sort((a,b) => {
        if(a.priority === 'high' && b.priority !== 'high') return -1;
        if(a.priority !== 'high' && b.priority === 'high') return 1;

        if(a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }

        if(a.dueDate) return -1;
        if(b.dueDate) return 1;

        return 0;
    });
};