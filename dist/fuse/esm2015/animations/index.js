import { sequence, trigger, animate, style, group, query, transition, animateChild, state, animation, useAnimation, stagger } from '@angular/animations';
const customAnimation = animation([
    style({
        opacity: '{{opacity}}',
        transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*'))
], {
    params: {
        duration: '200ms',
        delay: '0ms',
        opacity: '0',
        scale: '1',
        x: '0',
        y: '0',
        z: '0'
    }
});
export const fuseAnimations = [
    trigger('animate', [transition('void => *', [useAnimation(customAnimation)])]),
    trigger('animateStagger', [
        state('50', style('*')),
        state('100', style('*')),
        state('200', style('*')),
        transition('void => 50', query('@*', [
            stagger('50ms', [
                animateChild()
            ])
        ], { optional: true })),
        transition('void => 100', query('@*', [
            stagger('100ms', [
                animateChild()
            ])
        ], { optional: true })),
        transition('void => 200', query('@*', [
            stagger('200ms', [
                animateChild()
            ])
        ], { optional: true }))
    ]),
    trigger('fadeInOut', [
        state('0', style({
            display: 'none',
            opacity: 0
        })),
        state('1', style({
            display: 'block',
            opacity: 1
        })),
        transition('1 => 0', animate('300ms ease-out')),
        transition('0 => 1', animate('300ms ease-in'))
    ]),
    trigger('slideInOut', [
        state('0', style({
            height: '0px',
            display: 'none'
        })),
        state('1', style({
            height: '*',
            display: 'block'
        })),
        transition('1 => 0', animate('300ms ease-out')),
        transition('0 => 1', animate('300ms ease-in'))
    ]),
    trigger('slideIn', [
        transition('void => left', [
            style({
                transform: 'translateX(100%)'
            }),
            animate('300ms ease-in', style({
                transform: 'translateX(0)'
            }))
        ]),
        transition('left => void', [
            style({
                transform: 'translateX(0)'
            }),
            animate('300ms ease-in', style({
                transform: 'translateX(-100%)'
            }))
        ]),
        transition('void => right', [
            style({
                transform: 'translateX(-100%)'
            }),
            animate('300ms ease-in', style({
                transform: 'translateX(0)'
            }))
        ]),
        transition('right => void', [
            style({
                transform: 'translateX(0)'
            }),
            animate('300ms ease-in', style({
                transform: 'translateX(100%)'
            }))
        ]),
    ]),
    trigger('slideInLeft', [
        state('void', style({
            transform: 'translateX(-100%)',
            display: 'none'
        })),
        state('*', style({
            transform: 'translateX(0)',
            display: 'flex'
        })),
        transition('void => *', animate('300ms')),
        transition('* => void', animate('300ms'))
    ]),
    trigger('slideInRight', [
        state('void', style({
            transform: 'translateX(100%)',
            display: 'none'
        })),
        state('*', style({
            transform: 'translateX(0)',
            display: 'flex'
        })),
        transition('void => *', animate('300ms')),
        transition('* => void', animate('300ms'))
    ]),
    trigger('slideInTop', [
        state('void', style({
            transform: 'translateY(-100%)',
            display: 'none'
        })),
        state('*', style({
            transform: 'translateY(0)',
            display: 'flex'
        })),
        transition('void => *', animate('300ms')),
        transition('* => void', animate('300ms'))
    ]),
    trigger('slideInBottom', [
        state('void', style({
            transform: 'translateY(100%)',
            display: 'none'
        })),
        state('*', style({
            transform: 'translateY(0)',
            display: 'flex'
        })),
        transition('void => *', animate('300ms')),
        transition('* => void', animate('300ms'))
    ]),
    trigger('expandCollapse', [
        state('void', style({
            height: '0px'
        })),
        state('*', style({
            height: '*'
        })),
        transition('void => *', animate('300ms ease-out')),
        transition('* => void', animate('300ms ease-in'))
    ]),
    // -----------------------------------------------------------------------------------------------------
    // @ Router animations
    // -----------------------------------------------------------------------------------------------------
    trigger('routerTransitionLeft', [
        transition('* => *', [
            query('content > :enter, content > :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    transform: 'translateX(100%)',
                    opacity: 0
                })
            ], { optional: true }),
            sequence([
                group([
                    query('content > :leave', [
                        style({
                            transform: 'translateX(0)',
                            opacity: 1
                        }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateX(-100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    query('content > :enter', [
                        style({ transform: 'translateX(100%)' }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateX(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                query('content > :leave', animateChild(), { optional: true }),
                query('content > :enter', animateChild(), { optional: true })
            ])
        ])
    ]),
    trigger('routerTransitionRight', [
        transition('* => *', [
            query('content > :enter, content > :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    transform: 'translateX(-100%)',
                    opacity: 0
                })
            ], { optional: true }),
            sequence([
                group([
                    query('content > :leave', [
                        style({
                            transform: 'translateX(0)',
                            opacity: 1
                        }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateX(100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    query('content > :enter', [
                        style({ transform: 'translateX(-100%)' }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateX(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                query('content > :leave', animateChild(), { optional: true }),
                query('content > :enter', animateChild(), { optional: true })
            ])
        ])
    ]),
    trigger('routerTransitionUp', [
        transition('* => *', [
            query('content > :enter, content > :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    transform: 'translateY(100%)',
                    opacity: 0
                })
            ], { optional: true }),
            group([
                query('content > :leave', [
                    style({
                        transform: 'translateY(0)',
                        opacity: 1
                    }),
                    animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                        transform: 'translateY(-100%)',
                        opacity: 0
                    }))
                ], { optional: true }),
                query('content > :enter', [
                    style({ transform: 'translateY(100%)' }),
                    animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                        transform: 'translateY(0%)',
                        opacity: 1
                    }))
                ], { optional: true })
            ]),
            query('content > :leave', animateChild(), { optional: true }),
            query('content > :enter', animateChild(), { optional: true })
        ])
    ]),
    trigger('routerTransitionDown', [
        transition('* => *', [
            query('content > :enter, content > :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    transform: 'translateY(-100%)',
                    opacity: 0
                })
            ], { optional: true }),
            sequence([
                group([
                    query('content > :leave', [
                        style({
                            transform: 'translateY(0)',
                            opacity: 1
                        }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateY(100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    query('content > :enter', [
                        style({ transform: 'translateY(-100%)' }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateY(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                query('content > :leave', animateChild(), { optional: true }),
                query('content > :enter', animateChild(), { optional: true })
            ])
        ])
    ]),
    trigger('routerTransitionFade', [
        transition('* => *', group([
            query('content > :enter, content > :leave ', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    opacity: 0
                })
            ], { optional: true }),
            query('content > :leave', [
                style({
                    opacity: 1
                }),
                animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                    opacity: 0
                }))
            ], { optional: true }),
            query('content > :enter', [
                style({
                    opacity: 0
                }),
                animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                    opacity: 1
                }))
            ], { optional: true }),
            query('content > :enter', animateChild(), { optional: true }),
            query('content > :leave', animateChild(), { optional: true })
        ]))
    ])
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJhbmltYXRpb25zL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXpKLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM5QixLQUFLLENBQUM7UUFDRixPQUFPLEVBQUksYUFBYTtRQUN4QixTQUFTLEVBQUUsbURBQW1EO0tBQ2pFLENBQUM7SUFDRixPQUFPLENBQUMsdURBQXVELEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQy9FLEVBQUU7SUFDQyxNQUFNLEVBQUU7UUFDSixRQUFRLEVBQUUsT0FBTztRQUNqQixLQUFLLEVBQUssS0FBSztRQUNmLE9BQU8sRUFBRyxHQUFHO1FBQ2IsS0FBSyxFQUFLLEdBQUc7UUFDYixDQUFDLEVBQVMsR0FBRztRQUNiLENBQUMsRUFBUyxHQUFHO1FBQ2IsQ0FBQyxFQUFTLEdBQUc7S0FDaEI7Q0FDSixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7SUFFMUIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUUsT0FBTyxDQUFDLGdCQUFnQixFQUFFO1FBQ3RCLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxD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QUFDO29CQUNGLE9BQU8sRUFBRSxDQUFDO2lCQUNiLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLHNDQUFzQyxFQUMxQyxLQUFLLENBQUM7b0JBQ0YsT0FBTyxFQUFFLENBQUM7aUJBQ2IsQ0FBQyxDQUFDO2FBQ1YsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQztvQkFDRixPQUFPLEVBQUUsQ0FBQztpQkFDYixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxzQ0FBc0MsRUFDMUMsS0FBSyxDQUFDO29CQUNGLE9BQU8sRUFBRSxDQUFDO2lCQUNiLENBQUMsQ0FBQzthQUNWLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDLGtCQUFrQixFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztTQUM5RCxDQUFDLENBQUM7S0FDTixDQUFDO0NBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlcXVlbmNlLCB0cmlnZ2VyLCBhbmltYXRlLCBzdHlsZSwgZ3JvdXAsIHF1ZXJ5LCB0cmFuc2l0aW9uLCBhbmltYXRlQ2hpbGQsIHN0YXRlLCBhbmltYXRpb24sIHVzZUFuaW1hdGlvbiwgc3RhZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5jb25zdCBjdXN0b21BbmltYXRpb24gPSBhbmltYXRpb24oW1xuICAgIHN0eWxlKHtcbiAgICAgICAgb3BhY2l0eSAgOiAne3tvcGFjaXR5fX0nLFxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSh7e3NjYWxlfX0pIHRyYW5zbGF0ZTNkKHt7eH19LCB7e3l9fSwge3t6fX0pJ1xuICAgIH0pLFxuICAgIGFuaW1hdGUoJ3t7ZHVyYXRpb259fSB7e2RlbGF5fX0gY3ViaWMtYmV6aWVyKDAuMCwgMC4wLCAwLjIsIDEpJywgc3R5bGUoJyonKSlcbl0sIHtcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgZHVyYXRpb246ICcyMDBtcycsXG4gICAgICAgIGRlbGF5ICAgOiAnMG1zJyxcbiAgICAgICAgb3BhY2l0eSA6ICcwJyxcbiAgICAgICAgc2NhbGUgICA6ICcxJyxcbiAgICAgICAgeCAgICAgICA6ICcwJyxcbiAgICAgICAgeSAgICAgICA6ICcwJyxcbiAgICAgICAgeiAgICAgICA6ICcwJ1xuICAgIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZnVzZUFuaW1hdGlvbnMgPSBbXG5cbiAgICB0cmlnZ2VyKCdhbmltYXRlJywgW3RyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFt1c2VBbmltYXRpb24oY3VzdG9tQW5pbWF0aW9uKV0pXSksXG5cbiAgICB0cmlnZ2VyKCdhbmltYXRlU3RhZ2dlcicsIFtcbiAgICAgICAgc3RhdGUoJzUwJywgc3R5bGUoJyonKSksXG4gICAgICAgIHN0YXRlKCcxMDAnLCBzdHlsZSgnKicpKSxcbiAgICAgICAgc3RhdGUoJzIwMCcsIHN0eWxlKCcqJykpLFxuXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gNTAnLFxuICAgICAgICAgICAgcXVlcnkoJ0AqJyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHN0YWdnZXIoJzUwbXMnLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlQ2hpbGQoKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAxMDAnLFxuICAgICAgICAgICAgcXVlcnkoJ0AqJyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHN0YWdnZXIoJzEwMG1zJywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZUNoaWxkKClcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdLCB7b3B0aW9uYWw6IHRydWV9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gMjAwJyxcbiAgICAgICAgICAgIHF1ZXJ5KCdAKicsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBzdGFnZ2VyKCcyMDBtcycsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVDaGlsZCgpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSwge29wdGlvbmFsOiB0cnVlfSkpXG4gICAgXSksXG5cbiAgICB0cmlnZ2VyKCdmYWRlSW5PdXQnLCBbXG4gICAgICAgIHN0YXRlKCcwJywgc3R5bGUoe1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KSksXG4gICAgICAgIHN0YXRlKCcxJywgc3R5bGUoe1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCcxID0+IDAnLCBhbmltYXRlKCczMDBtcyBlYXNlLW91dCcpKSxcbiAgICAgICAgdHJhbnNpdGlvbignMCA9PiAxJywgYW5pbWF0ZSgnMzAwbXMgZWFzZS1pbicpKVxuICAgIF0pLFxuXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcbiAgICAgICAgc3RhdGUoJzAnLCBzdHlsZSh7XG4gICAgICAgICAgICBoZWlnaHQgOiAnMHB4JyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9KSksXG4gICAgICAgIHN0YXRlKCcxJywgc3R5bGUoe1xuICAgICAgICAgICAgaGVpZ2h0IDogJyonLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJzEgPT4gMCcsIGFuaW1hdGUoJzMwMG1zIGVhc2Utb3V0JykpLFxuICAgICAgICB0cmFuc2l0aW9uKCcwID0+IDEnLCBhbmltYXRlKCczMDBtcyBlYXNlLWluJykpXG4gICAgXSksXG5cbiAgICB0cmlnZ2VyKCdzbGlkZUluJywgW1xuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGxlZnQnLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJ1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzMwMG1zIGVhc2UtaW4nLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgKSxcbiAgICAgICAgdHJhbnNpdGlvbignbGVmdCA9PiB2b2lkJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSdcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCczMDBtcyBlYXNlLWluJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICApLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHJpZ2h0JywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMzAwbXMgZWFzZS1pbicsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICApLFxuICAgICAgICB0cmFuc2l0aW9uKCdyaWdodCA9PiB2b2lkJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSdcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCczMDBtcyBlYXNlLWluJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKSdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdXG4gICAgICAgICksXG4gICAgXSksXG5cbiAgICB0cmlnZ2VyKCdzbGlkZUluTGVmdCcsIFtcbiAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0xMDAlKScsXG4gICAgICAgICAgICBkaXNwbGF5ICA6ICdub25lJ1xuICAgICAgICB9KSksXG4gICAgICAgIHN0YXRlKCcqJywgc3R5bGUoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXG4gICAgICAgICAgICBkaXNwbGF5ICA6ICdmbGV4J1xuICAgICAgICB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoJzMwMG1zJykpLFxuICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBhbmltYXRlKCczMDBtcycpKVxuICAgIF0pLFxuXG4gICAgdHJpZ2dlcignc2xpZGVJblJpZ2h0JywgW1xuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknLFxuICAgICAgICAgICAgZGlzcGxheSAgOiAnbm9uZSdcbiAgICAgICAgfSkpLFxuICAgICAgICBzdGF0ZSgnKicsIHN0eWxlKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxuICAgICAgICAgICAgZGlzcGxheSAgOiAnZmxleCdcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKCczMDBtcycpKSxcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMzAwbXMnKSlcbiAgICBdKSxcblxuICAgIHRyaWdnZXIoJ3NsaWRlSW5Ub3AnLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTAwJSknLFxuICAgICAgICAgICAgZGlzcGxheSAgOiAnbm9uZSdcbiAgICAgICAgfSkpLFxuICAgICAgICBzdGF0ZSgnKicsIHN0eWxlKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICAgICAgZGlzcGxheSAgOiAnZmxleCdcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKCczMDBtcycpKSxcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMzAwbXMnKSlcbiAgICBdKSxcblxuICAgIHRyaWdnZXIoJ3NsaWRlSW5Cb3R0b20nLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJyxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDEwMCUpJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5ICA6ICdub25lJ1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICBzdGF0ZSgnKicsIHN0eWxlKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICAgICAgZGlzcGxheSAgOiAnZmxleCdcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKCczMDBtcycpKSxcbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMzAwbXMnKSlcbiAgICBdKSxcblxuICAgIHRyaWdnZXIoJ2V4cGFuZENvbGxhcHNlJywgW1xuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgIGhlaWdodDogJzBweCdcbiAgICAgICAgfSkpLFxuICAgICAgICBzdGF0ZSgnKicsIHN0eWxlKHtcbiAgICAgICAgICAgIGhlaWdodDogJyonXG4gICAgICAgIH0pKSxcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgYW5pbWF0ZSgnMzAwbXMgZWFzZS1vdXQnKSksXG4gICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIGFuaW1hdGUoJzMwMG1zIGVhc2UtaW4nKSlcbiAgICBdKSxcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBSb3V0ZXIgYW5pbWF0aW9uc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgXG4gICAgdHJpZ2dlcigncm91dGVyVHJhbnNpdGlvbkxlZnQnLCBbXG5cbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiAqJywgW1xuICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6ZW50ZXIsIGNvbnRlbnQgPiA6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0ICAgIDogMCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQgICA6IDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwge29wdGlvbmFsOiB0cnVlfSksXG4gICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlcicsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ICA6IDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwge29wdGlvbmFsOiB0cnVlfSksXG4gICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDpsZWF2ZScsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ICA6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnNjAwbXMgY3ViaWMtYmV6aWVyKDAuMCwgMC4wLCAwLjIsIDEpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlcicsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJ30pLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnNjAwbXMgY3ViaWMtYmV6aWVyKDAuMCwgMC4wLCAwLjIsIDEpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6bGVhdmUnLCBhbmltYXRlQ2hpbGQoKSwge29wdGlvbmFsOiB0cnVlfSksXG4gICAgICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6ZW50ZXInLCBhbmltYXRlQ2hpbGQoKSwge29wdGlvbmFsOiB0cnVlfSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSksXG5cbiAgICB0cmlnZ2VyKCdyb3V0ZXJUcmFuc2l0aW9uUmlnaHQnLCBbXG5cbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiAqJywgW1xuICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6ZW50ZXIsIGNvbnRlbnQgPiA6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0ICAgIDogMCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQgICA6IDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwge29wdGlvbmFsOiB0cnVlfSksXG4gICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlcicsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgIGdyb3VwKFtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzYwMG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlcicsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0xMDAlKSd9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzYwMG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgIDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICBdLCB7b3B0aW9uYWw6IHRydWV9KVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmxlYXZlJywgYW5pbWF0ZUNoaWxkKCksIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmVudGVyJywgYW5pbWF0ZUNoaWxkKCksIHtvcHRpb25hbDogdHJ1ZX0pXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0pLFxuXG4gICAgdHJpZ2dlcigncm91dGVyVHJhbnNpdGlvblVwJywgW1xuXG4gICAgICAgIHRyYW5zaXRpb24oJyogPT4gKicsIFtcbiAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmVudGVyLCBjb250ZW50ID4gOmxlYXZlJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHRvcCAgICAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBib3R0b20gIDogMCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdCAgICA6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0ICAgOiAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmxlYXZlJywgW1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgIDogMVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnNjAwbXMgY3ViaWMtYmV6aWVyKDAuMCwgMC4wLCAwLjIsIDEpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICBdLCB7b3B0aW9uYWw6IHRydWV9KSxcbiAgICAgICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlcicsIFtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTAwJSknfSksXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzYwMG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwJSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgIDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgXSwge29wdGlvbmFsOiB0cnVlfSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6bGVhdmUnLCBhbmltYXRlQ2hpbGQoKSwge29wdGlvbmFsOiB0cnVlfSksXG4gICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlcicsIGFuaW1hdGVDaGlsZCgpLCB7b3B0aW9uYWw6IHRydWV9KVxuICAgICAgICBdKVxuICAgIF0pLFxuXG4gICAgdHJpZ2dlcigncm91dGVyVHJhbnNpdGlvbkRvd24nLCBbXG5cbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiAqJywgW1xuICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6ZW50ZXIsIGNvbnRlbnQgPiA6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0ICAgIDogMCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQgICA6IDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwge29wdGlvbmFsOiB0cnVlfSksXG4gICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlcicsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgIGdyb3VwKFtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzYwMG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIF0sIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlcicsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMDAlKSd9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzYwMG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgIDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICBdLCB7b3B0aW9uYWw6IHRydWV9KVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmxlYXZlJywgYW5pbWF0ZUNoaWxkKCksIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmVudGVyJywgYW5pbWF0ZUNoaWxkKCksIHtvcHRpb25hbDogdHJ1ZX0pXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0pLFxuXG4gICAgdHJpZ2dlcigncm91dGVyVHJhbnNpdGlvbkZhZGUnLCBbXG5cbiAgICAgICAgdHJhbnNpdGlvbignKiA9PiAqJywgZ3JvdXAoW1xuXG4gICAgICAgICAgICBxdWVyeSgnY29udGVudCA+IDplbnRlciwgY29udGVudCA+IDpsZWF2ZSAnLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSAgOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0ICAgIDogMCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQgICA6IDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSwge29wdGlvbmFsOiB0cnVlfSksXG5cbiAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmVudGVyJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLCB7b3B0aW9uYWw6IHRydWV9KSxcbiAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmxlYXZlJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzMwMG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICBdLCB7b3B0aW9uYWw6IHRydWV9KSxcbiAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmVudGVyJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzMwMG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICBdLCB7b3B0aW9uYWw6IHRydWV9KSxcbiAgICAgICAgICAgIHF1ZXJ5KCdjb250ZW50ID4gOmVudGVyJywgYW5pbWF0ZUNoaWxkKCksIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgICAgICAgcXVlcnkoJ2NvbnRlbnQgPiA6bGVhdmUnLCBhbmltYXRlQ2hpbGQoKSwge29wdGlvbmFsOiB0cnVlfSlcbiAgICAgICAgXSkpXG4gICAgXSlcbl07XG4iXX0=