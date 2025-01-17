import { ShieldCheck, MessageCircle, ShieldBan } from "lucide-react";

const ACTION_OPTIONS = {
    POST: {
        Report: {
            title: 'Why are you Reporting this post ?',
            options: [
                'Harassment or bullying',
                'Hate speech or discrimination',
                'Inappropriate profile content',
                'Its may be hacked',
            ]
        },
    },
    USER: {
        Report: {
            title: 'Why are you Reporting this user ?',
            options: [
                'Harassment or bullying',
                'Hate speech or discrimination',
                'Inappropriate profile content',
                'Its may be hacked',
            ]
        },
        Restrict: {
            title: 'Are you having a problem with this account',
            value: 'Restrict',
            messages: [
                {
                    text: ` Limit unwanted interactions without having to block or unfollow someone you know.`,
                    icon: ShieldCheck
                },
                {
                    text: `Their chat will be moved to your message requests, so they won't see when you've read it.`,
                    icon: MessageCircle
                },

            ]
        },
        Block : {
            title: 'Are you sure to block this account ? ',
            value: 'Block',
            messages: [
                {
                    text: `They won't be able to find your profile or posts. We won't let them know that you've blocked them.`,
                    icon:  ShieldBan
                }
            ],
            
        }
    }
}


export default ACTION_OPTIONS;