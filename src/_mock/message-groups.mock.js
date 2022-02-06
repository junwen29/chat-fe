import _ from "lodash";
import moment from "moment";

const getAuthor = () => {
    return _.random(1, 2) == 1 ? "Calvin" : "Me";
};

const para =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar eleifend tempus. Sed sit amet sollicitudin dolor, non varius massa. Donec velit magna, ornare in arcu eu, hendrerit porta ante. Nam rhoncus fermentum nibh in fermentum. Maecenas nunc leo, luctus at orci at, ornare interdum leo. Ut libero nunc, eleifend eget nisi in, viverra malesuada sapien. Duis a dignissim orci. Aenean leo massa, fringilla in tincidunt sit amet, vestibulum volutpat ligula. Donec a efficitur nulla, nec aliquet quam.";

const getMessage = (id, para, time) => ({
    id: id,
    content: para,
    time: time,
    avatar: `https://cdn.vuetifyjs.com/images/lists/${id}.jpg`,
    from: getAuthor(),
});

export function createMessageGroup(dateHeader, numMessages) {
    return (
        {
            date: dateHeader,
            messages: _.range(numMessages).map(() => (
                getMessage(
                    _.random(1, 3),
                    para.substring(0, _.random(50, para.length)),
                    moment().format("HH:mm"))
            ))
        })
}
