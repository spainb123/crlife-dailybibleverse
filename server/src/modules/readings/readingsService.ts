export interface ReadingRef {
    month: number,
    day: number
}

export interface ReadingData {
    name: string,
    header: string,
    content: string,
    passageRef: string
}

export async function fetchReading(ref: ReadingRef): Promise<ReadingData>
{   
    const month = getMonthName(ref.month);
    const day = `${ref.day}${getDayStringSuffix(ref.day)}`;
    const year = new Date().getFullYear();

    const readingName = `${month} ${day}, ${year}`;

    switch (ref.day % 3)
    {
        case 0:
            return {
                name: readingName,
                header: `The Impartial Power of God`,
                content: `We trample the blood of the Son of God underfoot if we think we are forgiven because we are sorry for our sins. The only reason for the forgiveness of our sins by God, and the infinite depth of His promise to forget them, is the death of Jesus Christ. Our repentance is merely the result of our personal realization of the atonement by the Cross of Christ, which He has provided for us. “…Christ Jesus…became for us wisdom from God— and righteousness and sanctification and redemption…” (1 Corinthians 1:30). Once we realize that Christ has become all this for us, the limitless joy of God begins in us. And wherever the joy of God is not present, the death sentence is still in effect.
                No matter who or what we are, God restores us to right standing with Himself only by means of the death of Jesus Christ. God does this, not because Jesus pleads with Him to do so but because He died. It cannot be earned, just accepted. All the pleading for salvation which deliberately ignores the Cross of Christ is useless. It is knocking at a door other than the one which Jesus has already opened. We protest by saying, “But I don’t want to come that way. It is too humiliating to be received as a sinner.” God’s response, through Peter, is, “… there is no other name…by which we must be saved” (Acts 4:12). What at first appears to be heartlessness on God’s part is actually the true expression of His heart. There is unlimited entrance His way. “In Him we have redemption through His blood…” (Ephesians 1:7). To identify with the death of Jesus Christ means that we must die to everything that was never a part of Him.
                God is just in saving bad people only as He makes them good. Our Lord does not pretend we are all right when we are all wrong. The atonement by the Cross of Christ is the propitiation God uses to make unholy people holy.`,
                passageRef: 'Psalm.71'
            }
        case 1:
            return {
                name: readingName,
                header: `The Opposition of the Natural`,
                content: `The natural life itself is not sinful. But we must abandon sin, having nothing to do with it in any way whatsoever. Sin belongs to hell and to the devil. I, as a child of God, belong to heaven and to God. It is not a question of giving up sin, but of giving up my right to myself, my natural independence, and my self-will. This is where the battle has to be fought. The things that are right, noble, and good from the natural standpoint are the very things that keep us from being God’s best. Once we come to understand that natural moral excellence opposes or counteracts surrender to God, we bring our soul into the center of its greatest battle. Very few of us would debate over what is filthy, evil, and wrong, but we do debate over what is good. It is the good that opposes the best. The higher up the scale of moral excellence a person goes, the more intense the opposition to Jesus Christ. “Those who are Christ’s have crucified the flesh….” The cost to your natural life is not just one or two things, but everything. Jesus said, “If anyone desires to come after Me, let him deny himself…” (Matthew 16:24). That is, he must deny his right to himself, and he must realize who Jesus Christ is before he will bring himself to do it. Beware of refusing to go to the funeral of your own independence.
                The natural life is not spiritual, and it can be made spiritual only through sacrifice. If we do not purposely sacrifice the natural, the supernatural can never become natural to us. There is no high or easy road. Each of us has the means to accomplish it entirely in his own hands. It is not a question of praying, but of sacrificing, and thereby performing His will.`,
                passageRef: 'Psalm.72'
            }
        default:
            return {
                name: readingName,
                header: `The Offering Of The Natural`,
                content: `Paul is not dealing with sin in this chapter of Galatians, but with the relation of the natural to the spiritual. The natural must be turned into the spiritual by sacrifice, otherwise a tremendous divorce will be produced in the actual life. Why should God ordain the natural to be sacrificed? God did not. It is not God’s order, but His permissive will. God’s order was that the natural should be transformed into the spiritual by obedience; it is sin that made it necessary for the natural to be sacrificed.
                Abraham had to offer up Ishmael before he offered up Isaac. Some of us are trying to offer up spiritual sacrifices to God before we have sacrificed the natural. The only way in which we can offer a spiritual sacrifice to God is by presenting our bodies a living sacrifice. Sanctification means more than deliverance from sin, it means the deliberate commitment of myself whom God has saved to God, and that I do not care what it costs.
                If we do not sacrifice the natural to the spiritual, the natural life will mock at the life of the Son of God in us and produce a continual swither. This is always the result of an undisciplined spiritual nature. We go wrong because we stubbornly refuse to discipline ourselves, physically, morally or mentally. “I wasn’t disciplined when I was a child.” You must discipline yourself now. If you do not, you will ruin the whole of your personal life for God.
                God is not with our natural life while we pamper it; but when we put it out in the desert and resolutely keep it under, then God will be with it; and He will open up wells and oases, and fulfill all His promises for the natural.`,
                passageRef: 'Proverbs.9:1-2'
            }
    }
}

function getMonthName(month: number) : string
{
    switch(month)
    {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        default:
            return 'December';            
    }
}

function getDayStringSuffix(day: number) : string
{
    switch (day)
    {
        case 1:
        case 21:
        case 31:
            return 'st';
        case 2:
        case 22: 
            return 'nd';
        case 3:
        case 23:
            return 'rd';
        default:
            return 'th';
    }
}