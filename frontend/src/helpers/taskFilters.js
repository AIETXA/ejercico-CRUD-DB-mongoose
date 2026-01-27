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
                if (!t.dueDate || t,completed || t.postponed) 
                    return false;
                const due = new Date(t.dueDate);
                return due.toDateString() === today.toDateString();
            });
    }
} 