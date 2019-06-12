import * as React from 'react';
import IReadingData from '../store/IReadingData';
import { Selection, IStore } from '../store/Models';
import { connect } from 'react-redux';

import './ReadingData.scss';
import './nlt-api.css';

interface IReadingViewProps {
        selected: Selection,
        data: IReadingData
}

class ReadingView extends React.Component<IReadingViewProps>
{
        render() {
                console.log(`ReadingView render, selected: ${this.props.selected}`);
                const data = this.props.data;
                return (
                        <div className='ReadingData'>
                                <div className="Banner text-center">
                                        <h1>Daily Bible Reading</h1>
                                        <h2>{data.fullDate}</h2>
                                </div>
                                <div className="content-break" />
                                <div id={'OTNOTE'} className="noteContent" dangerouslySetInnerHTML={{ __html: data.note.ot }}></div>
                                <div className="content-break" />
                                <div id={'OTBODY'} className="nltContent" dangerouslySetInnerHTML={{ __html: data.pass.ot.body }}></div>
                                <div className="content-break" />
                                <div id={'NTNOTE'} className="noteContent" dangerouslySetInnerHTML={{ __html: data.note.nt }}></div>
                                <div className="content-break" />
                                <div id={'NTBODY'} className="nltContent" dangerouslySetInnerHTML={{ __html: data.pass.nt.body }}></div>
                                <div className="content-break" />
                                <div id={'PSBODY'} className="nltContent" dangerouslySetInnerHTML={{ __html: data.pass.ps.body }}></div>
                                <div className="content-break" />
                                <div id={'PRBODY'} className="nltContent" dangerouslySetInnerHTML={{ __html: data.pass.pr.body }}></div>
                                <div className="content-break" />
                                <div id={'FSNOTE'} className="noteContent" dangerouslySetInnerHTML={{ __html: data.note.fs }}></div>
                                <div className="content-last-break" />
                        </div>
                );
        }

        componentDidMount() {
                console.log(`ReadingView componentDidMount, selected: ${this.props.selected}`);
                this.scrollToSelection();
        }

        componentDidUpdate() {
                console.log(`ReadingView componentDidUpdate, selected: ${this.props.selected}`);
                this.scrollToSelection();
        }

        scrollToSelection() {
                document.getElementById(this.getElementIdFromCurrentSelection()).scrollIntoView();
        }

        getElementIdFromCurrentSelection() {
                switch (this.props.selected) {
                        case Selection.NotesNT:
                                return 'NTNOTE';
                        case Selection.NotesFS:
                                return 'FSNOTE';
                        case Selection.PassOT:
                                return 'OTBODY';
                        case Selection.PassNT:
                                return 'NTBODY';
                        case Selection.PassPS:
                                return 'PSBODY';
                        case Selection.PassPr:
                                return 'PRBODY';
                        case Selection.NotesOT:
                        default:
                                return 'OTNOTE';
                }
        }

}

function mapStateToProps(state: IStore): IReadingViewProps {
        return {
                selected: state.selection,
                data: state.data
        }
}

export default connect(mapStateToProps)(ReadingView);
