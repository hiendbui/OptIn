export const fetchLogo = (institution) => ( 
    $.ajax({ 
        method: 'GET', 
        url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${institution.split(' ').join('').toLowerCase()}`,
    })
);


