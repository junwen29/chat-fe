
const header = (header) => [{ header: header }, divider()]
const divider = () => ({ divider: true, inset: true })
const chatRoom = (id, title, subtitle) => [
    { avatar: `https://cdn.vuetifyjs.com/images/lists/${id}.jpg`, title, subtitle },
    divider()
];

export function createChatRoomsGroup(headerTime) {
    return ([
        ...header(headerTime),
        ...chatRoom(
            1,
            "Brunch this weekend?", `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
        ),
        ...chatRoom(
            2,
            'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
        ),
        ...chatRoom(
            3,
            "Oui oui",
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
        ),
        ...chatRoom(
            4,
            "Birthday gift",
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
        ),
        ...chatRoom(
            5,
            "Recipe to try",
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
        )
    ])
}