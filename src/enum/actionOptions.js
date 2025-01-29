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
        "Delete Post": {
            title: 'Are you sure to delete this post ?',
            value: 'Delete',
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
        "Archive Post": {
            title: 'Are you sure to archive this post ?',
            value: 'Archive',
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
        Publish: {
            title: 'Are you sure ?',
            value: 'Publish',
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
        }

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
        Block: {
            title: 'Are you sure to block this account ? ',
            value: 'Block',
            messages: [
                {
                    text: `They won't be able to find your profile or posts. We won't let them know that you've blocked them.`,
                    icon: ShieldBan
                }
            ],

        }
    }
}



export const TOGGLE_ACTION_STATE = {
    Ban: 'Unban',
    Unban: 'Ban',
    Block: 'Unblock',
    Unblock: 'Block',
    Premium: 'Status',
    Status: 'Premium',
    Restrict: 'Unrestrict',
    Unrestrict: 'Restrict',
}

export default ACTION_OPTIONS;