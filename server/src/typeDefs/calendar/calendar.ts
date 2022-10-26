export const typeCalendar = `#graphql
    type Calendar {
        refreshToken: String
    }
    type Query {
        getCalendar: Calendar
    }
`;