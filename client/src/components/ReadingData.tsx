import * as React from 'react';
import IReadingData from '../store/IReadingData';
import { Selection, IStore } from '../store/Models';
import { connect } from 'react-redux';

interface IReadingViewProps
{
        selected: Selection,
        data: IReadingData
}

class ReadingView extends React.Component<IReadingViewProps>
{
        render()
        {
                console.log(`ReadingView render, selected: ${this.props.selected}`);
                const data = this.props.data;
                return (
                        <div className='ReadingData'>
                                <div>Full Date: {data.fullDate}</div>
                                <div id={'OTNOTE'} dangerouslySetInnerHTML={{ __html: data.note.ot }}></div>
                                <h1 id={'OTHEAD'}>Old Testament Reading</h1>
                                <h2>{data.pass.ot.heading}</h2>
                                <div id={'OTBODY'} dangerouslySetInnerHTML={{ __html: data.pass.ot.body }}></div>
                                <div id={'NTNOTE'} dangerouslySetInnerHTML={{ __html: data.note.nt }}></div>
                                <h1 id={'NTHEAD'}>New Testament Reading</h1>
                                <h2>{data.pass.nt.heading}</h2>
                                <div id={'NTBODY'} dangerouslySetInnerHTML={{ __html: data.pass.nt.body }}></div>
                                <h1 id={'PSHEAD'}>Psalms Reading</h1>
                                <h2>{data.pass.ps.heading}</h2>
                                <div id={'PSBODY'} dangerouslySetInnerHTML={{ __html: data.pass.ps.body }}></div>
                                <h1 id={'PRHEAD'}>Proverbs Reading</h1>
                                <h2>{data.pass.pr.heading}</h2>
                                <div id={'PRBODY'} dangerouslySetInnerHTML={{ __html: data.pass.pr.body }}></div>
                                <div id={'FSNOTE'} dangerouslySetInnerHTML={{ __html: data.note.fs }}></div>
                                <div id={'READBUFFER'}></div>
                        </div>
                );
        }

        componentDidMount()
        {
                console.log(`ReadingView componentDidMount, selected: ${this.props.selected}`);
                this.scrollToSelection();
        }

        componentDidUpdate()
        {
                console.log(`ReadingView componentDidUpdate, selected: ${this.props.selected}`);
                this.scrollToSelection();
        }

        scrollToSelection()
        {
                document.getElementById(this.getElementIdFromCurrentSelection()).scrollIntoView();
        }

        getElementIdFromCurrentSelection()
        {
                switch(this.props.selected)
                {
                        case Selection.NotesNT:
                                return 'NTNOTE';
                        case Selection.NotesFS:
                                return 'FSNOTE';
                        case Selection.PassOT:
                                return 'OTHEAD';
                        case Selection.PassNT:
                                return 'NTHEAD';
                        case Selection.PassPS:
                                return 'PSHEAD';
                        case Selection.PassPr:
                                return 'PRHEAD';
                        case Selection.NotesOT:
                        default:
                                return 'OTNOTE';
                }
        }

}

function mapStateToProps(state: IStore) : IReadingViewProps
{
        return {
                selected: state.selection,
                data: state.data
        }
}

export default connect(mapStateToProps)(ReadingView);
