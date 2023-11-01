document.querySelectorAll(".action-update").forEach(elem => {
    elem.addEventListener("click", evt=> {
        createModal();
        populate_modal(document.querySelector("[id*=table-]"), evt);
    });
});

